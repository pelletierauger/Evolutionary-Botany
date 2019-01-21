(
~beats = Array.new;
~folder = PathName.new("/Users/guillaumepelletier/Desktop/Dropbox/Art/p5/Singing-Lines/SuperCollider/samples/percussions/");
~folder.entries.do({
    arg path;
    ~beats = ~beats.add(Buffer.read(s, path.fullPath));
});
)
~beats[0].play;

(
SynthDef(\percu, {
    arg buf = ~beats[0], rate = 1, spos = 0, pan = 1, amp = 1, out = ~reverbBus;
    var sig, env, lfo;
    sig = PlayBuf.ar(2, buf, rate * BufRateScale.ir(buf), startPos: 0, doneAction: 2);
    sig = sig * amp * 2;
    sig = Balance2.ar(sig[0], sig[1], 0, 1);
    Out.ar(out, sig);
}).add;
)




(
~beat1.stop;
~beat1 = Pbind(
    \instrument, \percu,
	\dur, Pseq([0.5], inf),
    \spos, 1717440,
    \rate, Pseq([1], inf),
    
    \type, Pseq([Rest(1), Rest(1), 12, Rest(1)], inf),
    \amp, Pseq([1, 0, 12, 0], inf),
// 	\pan, Pwhite(-1, 1, 20),
    \buf, Pseq([~beats[0], ~beats[1], ~beats[2], ~beats[3]], inf),
    \out, 0
).play(t, quant: 1, timingOffset: 0.5);
// ~beat1.stop;
// ~beat1.reset;
)