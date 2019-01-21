(
~root = PatternProxy(Pn(220, 1));
~third = PatternProxy(Pn(220, 1));
~fifth = PatternProxy(Pn(220, 1));
)

(
~bassTriad.free;
~bassTriad = OSCdef.new(
    \bass,
    {
        arg msg, time, addr, port;
        msg[1].postln;
        msg[2].postln;
        msg[3].postln;
        ~root.source = Pn(msg[1], 1);
        ~third.source = Pn(msg[2], 1);
        ~fifth.source = Pn(msg[3] * 0.midiratio, 1);
    },
    '/bassNotes'
);
)

(
~bassLine.stop;
~bassLine = Pbind(
    \instrument, \triangle,
    \dur, Prand([1 * 0.25], inf),
    \freq, Pseq([
        Pseq([~root],32),
        Pseq([~fifth],16), 
        Pseq([~third],16)
    ], inf),
    \amp, Pseq([
        3, 2, 1, 0.5
        ], inf),
    \rel, 0.12,
    \atk, 0.0001,
    \mod, 6
//                 \pan, Pwhite(-1, 1, 40),
//                 \buf, Prand([
//                     ~beats[0], 
//                     ~beats[1], 
//                     ~beats[2], 
//                     ~beats[3]
//                 ], 12),
//                 \out, ~reverbBus
    ).play(t, quant: 1);
)
