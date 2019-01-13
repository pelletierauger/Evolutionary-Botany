s.boot;

(
SynthDef(\pulse, {
	arg freq = 440, pul1 = 1, pul2 = 1, pan = 0, out = 0, amp = 1;
	var sig, mod, lp, sp, env;
    mod = SinOsc.kr(6) * 3;
    // sp = abs(SinOsc.kr(0.1)) * 220;
	sig = Impulse.ar(0.1, mul: 0.4)!2;
    // sig2 = Impulse.ar(pul2, mul: 0.4)!2;
    env = EnvGen.kr(Env.new([0, 1, 0.5, 0], [0.01, 0.15, 2.6]), doneAction: 2);
    // sig = sig + sig2;
    // sig = LPF.ar(sig, freq / 1);
    sig = Ringz.ar(sig, [freq, freq + 2], 2.5);
//     sig = LPF.ar(in: sig, freq: [freq, freq+2], mul: 1, add: 0);
	// sig = sig * 1;
    sig = sig * env;
    sig = sig * mod;
    sig = sig * 1.2;
    sig = sig * amp;
    // sig = sig * amp;
    // sig = Pan2(sig, pan);
    sig = Balance2.ar(sig[0], sig[1], pan, 1);
	Out.ar(out, sig);
}).add;
)

(
h.free;
h = Synth.new(\pulse, [\freq, 330]);
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


(
OSCdef.new(
    \fromnode,
    {
        arg msg, time, addr, port;
        // [msg, time, addr, port].postln;
        // msg[1].postln;
        d = Synth.new(\pulse, [\freq, msg[1]]);
//         d = Synth.new(\pulseTest, [\frequency, msg[1] * 0.5]);
    },
    '/hello/from/oscjs'
);
)