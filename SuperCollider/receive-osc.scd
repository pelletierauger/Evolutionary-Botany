s.boot;
s.quit;

(
~sourceGroup = Group.new;
~fxGroup = Group.after(~sourceGroup);
~reverbBus = Bus.audio(s, 2);
)

t = TempoClock.new(90 / 60);

(
SynthDef.new(\reverb, {
    arg in, out = 0;
    var sig, del, del2;
    sig = In.ar(in, 2);
    del = CombC.ar(in: sig[0],
    maxdelaytime: 0.1,
    delaytime: 0.1,
    decaytime: 20,
    mul: 1, add: 0);
    del2 = CombC.ar(in: sig[1],
    maxdelaytime: 0.12,
    delaytime: 0.2,
    decaytime: 20,
    mul: 1, add: 0);
	sig[0] = sig[0] + (del * 0.07);
    sig[1] = sig[1] + (del2 * 0.07);
    Out.ar(0, sig);
}).add;
)

(
~reverbSynth.free;
~reverbSynth = Synth.new(\reverb, [\in, ~reverbBus, \out, ~volumeBus], ~fxGroup);
)

(
h.free;
h = Synth.new(\pulse, [\freq, 660]);
)

(
SynthDef(\pulse, {
	arg freq = 440, pul1 = 1, pul2 = 1, pan = 0, out = 0, amp = 1, rel = 0.6;
	var sig, mod, lp, sp, env;
    mod = SinOsc.kr(1) * 0.5;
    // sp = abs(SinOsc.kr(0.1)) * 220;
	sig = Impulse.ar(0.1, mul: 0.4)!2;
    // sig2 = Impulse.ar(pul2, mul: 0.4)!2;
    env = EnvGen.kr(Env.new([0, 1, 0.5, 0], [0.01, 0.15, rel]), doneAction: 2);
    // sig = sig + sig2;
    // sig = LPF.ar(sig, freq / 1);
    sig = Ringz.ar(sig, [freq, freq + 2], rel * 0.9);
//     sig = LPF.ar(in: sig, freq: [freq, freq+2], mul: 1, add: 0);
	// sig = sig * 1;
    sig = sig * env;
    sig = sig * mod;
    sig = sig * amp;
    // sig = sig * amp;
    // sig = Pan2(sig, pan);
    sig = Balance2.ar(sig[0], sig[1], pan, 1);
	Out.ar(~reverbBus, sig);
}).add;
)

(
OSCdef.new(
    \fromnode,
    {
        arg msg, time, addr, port;
//         msg[0].postln;

        Synth.new(\pulse, [
            \freq, msg[1] * [1, 1, 2].choose, 
            \pan, rrand(-1.0, 1.0),
            \amp, 30,
            \rel, 0.26
        ]);
        Synth.new(\triangle, [
            \freq, msg[1] * [0.5, 1].choose, 
            \pan, rrand(-1.0, 1.0),
            \amp, 0.125 * 1.5,
            \rel, 0.4 * 8 * 2,
            \mod, [1, 3, 6].choose
        ]);
//         Synth.new(\voice, [
//             \rate, msg[1] * 0.5, 
//             \spos, 487728 * 0.73
//         ]);
//         Pbind(
//             \instrument, \voice,
//             \dur, Pseq([0.125, 0.25], 6),
//             \rate, msg[1] * 1 * Prand([1, 0.5, 0.5], 20), 
//             \spos, 487728 * 0.73,
//             \amp, Pgeom(2, 0.7, 20),
//             \rel, Pgeom(0.15, 1.01, 20),
//             \pan, Pwhite(-1.0, 1.0, 20)
//         ).play;
        if (40.rand < 2, {
            Pbind(
                \instrument, \percu,
//                 \dur, Prand([1, 0.25, 0.125], 40),
                
                \dur, Prand([2, 1, 0.25, 0.125], 40),
                \spos, 1717440,
//                 \rate, Pseq([1], 40),
                \rate, Prand([0.5, 1, 2, 4], 40),
                \amp, Pgeom(3, 0.9, 40),
                \pan, Pwhite(-1, 1, 40),
                \buf, Prand([
                    ~beats[0], 
                    ~beats[1], 
                    ~beats[2], 
                    ~beats[3]
                ], 12),
//                 \out, ~reverbBus
                \out, 0
            ).play(t, quant: 1);
        });
    },
    '/hello/from/oscjs'
);
)
(
if (5.rand < 2, {
    "bonjour".postln;
});
)

(
SynthDef.new(\triangle, {
    arg freq = 220, mod = 0.1, pan = 0, amp = 1, rel = 0.6, atk = 0.01;
    var sig, lfo, env;
    env = EnvGen.kr(Env.new([0, 1, 0], [atk, rel]), doneAction: 2);
    lfo = SinOsc.kr(mod);
    env = env * lfo;
    sig = LFTri.ar([freq, freq + 1]) * env;
    sig = sig * amp;
    sig = Balance2.ar(sig[0], sig[1], pan, 1);
	Out.ar(~reverbBus, sig);
}).add;
)

(
SynthDef.new(\pulseTest, {
    arg frequency = 220;
    var sig1, sig2, lfo, lfo2, env;
    env = XLine.kr(0.05, 0.001, 3, 1, 0, 2);
    lfo = SinOsc.kr(3);
    lfo2 = SinOsc.kr(ExpRand(20,800), mul: 0.75, add:1);
    env = env * lfo;
    sig1 = LFTri.ar((frequency + 1)) * env;
    sig2 = LFTri.ar(frequency) * env;
    sig1 = FreeVerb.ar(sig1, mix: 0.3, room: 0.95, damp: 0.15, mul: 1, add: 0);
    sig2 = FreeVerb.ar(sig2, mix: 0.3, room: 0.95, damp: 0.15, mul: 1, add: 0);
    Out.ar(0, sig1);
    Out.ar(1, sig2);
}).add;
)

~b1 = Buffer.read(s, "/Users/guillaumepelletier/Desktop/Dropbox/Création\ musicale/Morceaux\ exportés/By\ Mobile\ Bay\ H\ -\ test\ voix.aif");
~b1.numFrames;

(
SynthDef(\voice, {
    arg buf = ~b1, rate = 1, spos = 0, pan = 0, amp = 1, rel = 0.75;
    var sig, env, lfo;
    env = EnvGen.kr(Env.new([0, 1, 0], [0.1, rel]), doneAction: 2);
    sig = PlayBuf.ar(2, ~b1, rate * BufRateScale.ir(buf) / 277.18, startPos: spos);
    sig = sig * env;
    sig = sig * amp;
    sig = Balance2.ar(sig[0], sig[1], pan, 1);
    Out.ar(~reverbBus, sig);
}).add;
)

(
h.free;
h = Synth.new(\voice, [\rate, 277.18, \spos, 487728 * 0.73]);
)

(
// h.free;
h = Synth.new(\triangle, [\freq, 277.18 * 0.25 * 0.midiratio, \amp, 20, \rel, 0.5]);
)

s.record;
s.stopRecording;