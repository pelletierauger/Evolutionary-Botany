(function() {
    function r(e, n, t) {
        function o(i, f) {
            if (!n[i]) {
                if (!e[i]) { var c = "function" == typeof require && require; if (!f && c) return c(i, !0); if (u) return u(i, !0); var a = new Error("Cannot find module '" + i + "'"); throw a.code = "MODULE_NOT_FOUND", a }
                var p = n[i] = { exports: {} };
                e[i][0].call(p.exports, function(r) { var n = e[i][1][r]; return o(n || r) }, p, p.exports, r, e, n, t)
            }
            return n[i].exports
        }
        for (var u = "function" == typeof require && require, i = 0; i < t.length; i++) o(t[i]);
        return o
    }
    return r
})()({
    1: [function(require, module, exports) {
        Tonal.Key = require('./node_modules/tonal-key');
    }, { "./node_modules/tonal-key": 5 }],
    2: [function(require, module, exports) {
        'use strict';

        Object.defineProperty(exports, '__esModule', { value: true });

        var tonalNote = require('tonal-note');

        /**
         * [![npm version](https://img.shields.io/npm/v/tonal-array.svg?style=flat-square)](https://www.npmjs.com/package/tonal-array)
         *
         * Tonal array utilities. Create ranges, sort notes, ...
         *
         * @example
         * import * as Array;
         * Array.sort(["f", "a", "c"]) // => ["C", "F", "A"]
         *
         * @example
         * const Array = require("tonal-array")
         * Array.range(1, 4) // => [1, 2, 3, 4]
         *
         * @module Array
         */

        // ascending range
        function ascR(b, n) {
            for (var a = []; n--; a[n] = n + b) {}
            return a;
        }
        // descending range
        function descR(b, n) {
            for (var a = []; n--; a[n] = b - n) {}
            return a;
        }

        /**
         * Create a numeric range
         *
         * @param {Number} from
         * @param {Number} to
         * @return {Array}
         *
         * @example
         * Array.range(-2, 2) // => [-2, -1, 0, 1, 2]
         * Array.range(2, -2) // => [2, 1, 0, -1, -2]
         */
        function range(a, b) {
            return a === null || b === null ? [] :
                a < b ?
                ascR(a, b - a + 1) :
                descR(a, a - b + 1);
        }
        /**
         *
         * Rotates a list a number of times. It"s completly agnostic about the
         * contents of the list.
         *
         * @param {Integer} times - the number of rotations
         * @param {Array} array
         * @return {Array} the rotated array
         * @example
         * Array.rotate(1, [1, 2, 3]) // => [2, 3, 1]
         */
        function rotate(times, arr) {
            var len = arr.length;
            var n = ((times % len) + len) % len;
            return arr.slice(n, len).concat(arr.slice(0, n));
        }

        /**
         * Return a copy of the array with the null values removed
         * @function
         * @param {Array} array
         * @return {Array}
         *
         * @example
         * Array.compact(["a", "b", null, "c"]) // => ["a", "b", "c"]
         */
        var compact = function(arr) { return arr.filter(function(n) { return n === 0 || n; }); };

        // a function that get note heights (with negative number for pitch classes)
        var height = function(name) {
            var m = tonalNote.props(name).midi;
            return m !== null ? m : tonalNote.props(name + "-100").midi;
        };

        /**
         * Sort an array of notes in ascending order
         *
         * @param {String|Array} notes
         * @return {Array} sorted array of notes
         */
        function sort(src) {
            return compact(src.map(tonalNote.name)).sort(function(a, b) { return height(a) > height(b); });
        }

        /**
         * Get sorted notes with duplicates removed
         *
         * @function
         * @param {Array} notes
         */
        function unique(arr) {
            return sort(arr).filter(function(n, i, a) { return i === 0 || n !== a[i - 1]; });
        }

        /**
         * Randomizes the order of the specified array in-place, using the Fisher–Yates shuffle.
         *
         * @private
         * @function
         * @param {Array|String} arr - the array
         * @return {Array} the shuffled array
         *
         * @example
         * Array.shuffle(["C", "D", "E", "F"])
         */
        var shuffle = function(arr, rnd) {
            if (rnd === void 0) rnd = Math.random;

            var i, t;
            var m = arr.length;
            while (m) {
                i = (rnd() * m--) | 0;
                t = arr[m];
                arr[m] = arr[i];
                arr[i] = t;
            }
            return arr;
        };

        /**
         * Get all permutations of an array
         * http://stackoverflow.com/questions/9960908/permutations-in-javascript
         *
         * @param {Array} array - the array
         * @return {Array<Array>} an array with all the permutations
         */
        var permutations = function(arr) {
            if (arr.length === 0) {
                return [
                    []
                ];
            }
            return permutations(arr.slice(1)).reduce(function(acc, perm) {
                return acc.concat(
                    arr.map(function(e, pos) {
                        var newPerm = perm.slice();
                        newPerm.splice(pos, 0, arr[0]);
                        return newPerm;
                    })
                );
            }, []);
        };

        exports.range = range;
        exports.rotate = rotate;
        exports.compact = compact;
        exports.sort = sort;
        exports.unique = unique;
        exports.shuffle = shuffle;
        exports.permutations = permutations;

    }, { "tonal-note": 6 }],
    3: [function(require, module, exports) {
        'use strict';

        Object.defineProperty(exports, '__esModule', { value: true });

        var tonalNote = require('tonal-note');
        var tonalInterval = require('tonal-interval');

        /**
         * [![npm version](https://img.shields.io/npm/v/tonal-distance.svg)](https://www.npmjs.com/package/tonal-distance)
         * [![tonal](https://img.shields.io/badge/tonal-distance-yellow.svg)](https://github.com/danigb/tonal/tree/master/packages/tonal/distance)
         *
         * Transpose notes by intervals and find distances between notes
         *
         * @example
         * // es6
         * import * as Distance from "tonal-distance"
         * Distance.interval("C3", "C4") // => "1P"
         *
         * @example
         * // es6 import selected functions
         * import { interval, semitones, transpose } from "tonal-distance"
         *
         * semitones("C" ,"D") // => 2
         * interval("C4", "G4") // => "5P"
         * transpose("C4", "P5") // => "G4"
         *
         * @example
         * // included in tonal facade
         * const Tonal = require("tonal");
         * Tonal.Distance.transpose("C4", "P5")
         * Tonal.Distance.transposeBy("P5", "C4")
         *
         * @module Distance
         */

        // Map from letter step to number of fifths starting from "C":
        // { C: 0, D: 2, E: 4, F: -1, G: 1, A: 3, B: 5 }
        var FIFTHS = [0, 2, 4, -1, 1, 3, 5];

        // Given a number of fifths, return the octaves they span
        var fOcts = function(f) { return Math.floor((f * 7) / 12); };

        // Get the number of octaves it span each step
        var FIFTH_OCTS = FIFTHS.map(fOcts);

        var encode = function(ref) {
            var step = ref.step;
            var alt = ref.alt;
            var oct = ref.oct;
            var dir = ref.dir;
            if (dir === void 0) dir = 1;

            var f = FIFTHS[step] + 7 * alt;
            if (oct === null) { return [dir * f]; }
            var o = oct - FIFTH_OCTS[step] - 4 * alt;
            return [dir * f, dir * o];
        };

        // We need to get the steps from fifths
        // Fifths for CDEFGAB are [ 0, 2, 4, -1, 1, 3, 5 ]
        // We add 1 to fifths to avoid negative numbers, so:
        // for ["F", "C", "G", "D", "A", "E", "B"] we have:
        var STEPS = [3, 0, 4, 1, 5, 2, 6];

        // Return the number of fifths as if it were unaltered
        function unaltered(f) {
            var i = (f + 1) % 7;
            return i < 0 ? 7 + i : i;
        }

        var decode = function(f, o, dir) {
            var step = STEPS[unaltered(f)];
            var alt = Math.floor((f + 1) / 7);
            if (o === undefined) { return { step: step, alt: alt, dir: dir }; }
            var oct = o + 4 * alt + FIFTH_OCTS[step];
            return { step: step, alt: alt, oct: oct, dir: dir };
        };

        var memo = function(fn, cache) {
            if (cache === void 0) cache = {};

            return function(str) { return cache[str] || (cache[str] = fn(str)); };
        };

        var encoder = function(props) {
            return memo(function(str) {
                var p = props(str);
                return p.name === null ? null : encode(p);
            });
        };

        var encodeNote = encoder(tonalNote.props);
        var encodeIvl = encoder(tonalInterval.props);

        /**
         * Transpose a note by an interval. The note can be a pitch class.
         *
         * This function can be partially applied.
         *
         * @param {String} note
         * @param {String} interval
         * @return {String} the transposed note
         * @example
         * import { tranpose } from "tonal-distance"
         * transpose("d3", "3M") // => "F#3"
         * // it works with pitch classes
         * transpose("D", "3M") // => "F#"
         * // can be partially applied
         * ["C", "D", "E", "F", "G"].map(transpose("M3)) // => ["E", "F#", "G#", "A", "B"]
         */
        function transpose(note, interval) {
            if (arguments.length === 1) { return function(i) { return transpose(note, i); }; }
            var n = encodeNote(note);
            var i = encodeIvl(interval);
            if (n === null || i === null) { return null; }
            var tr = n.length === 1 ? [n[0] + i[0]] : [n[0] + i[0], n[1] + i[1]];
            return tonalNote.build(decode(tr[0], tr[1]));
        }

        /**
         * Transpose a pitch class by a number of perfect fifths.
         *
         * It can be partially applied.
         *
         * @function
         * @param {String} pitchClass - the pitch class
         * @param {Integer} fifhts - the number of fifths
         * @return {String} the transposed pitch class
         *
         * @example
         * import { trFifths } from "tonal-transpose"
         * [0, 1, 2, 3, 4].map(trFifths("C")) // => ["C", "G", "D", "A", "E"]
         * // or using tonal
         * Distance.trFifths("G4", 1) // => "D"
         */

        function trFifths(note, fifths) {
            if (arguments.length === 1) { return function(f) { return trFifths(note, f); }; }
            var n = encodeNote(note);
            if (n === null) { return null; }
            return tonalNote.build(decode(n[0] + fifths));
        }

        /**
         * Get the distance in fifths between pitch classes
         *
         * Can be partially applied.
         *
         * @param {String} to - note or pitch class
         * @param {String} from - note or pitch class
         */
        function fifths(from, to) {
            if (arguments.length === 1) { return function(to) { return fifths(from, to); }; }
            var f = encodeNote(from);
            var t = encodeNote(to);
            if (t === null || f === null) { return null; }
            return t[0] - f[0];
        }

        /**
         * The same as transpose with the arguments inverted.
         *
         * Can be partially applied.
         *
         * @param {String} note
         * @param {String} interval
         * @return {String} the transposed note
         * @example
         * import { tranposeBy } from "tonal-distance"
         * transposeBy("3m", "5P") // => "7m"
         */
        function transposeBy(interval, note) {
            if (arguments.length === 1) { return function(n) { return transpose(n, interval); }; }
            return transpose(note, interval);
        }

        var isDescending = function(e) { return e[0] * 7 + e[1] * 12 < 0; };
        var decodeIvl = function(i) { return isDescending(i) ? decode(-i[0], -i[1], -1) : decode(i[0], i[1], 1); };

        function addIntervals(ivl1, ivl2, dir) {
            var i1 = encodeIvl(ivl1);
            var i2 = encodeIvl(ivl2);
            if (i1 === null || i2 === null) { return null; }
            var i = [i1[0] + dir * i2[0], i1[1] + dir * i2[1]];
            return tonalInterval.build(decodeIvl(i));
        }

        /**
         * Add two intervals
         *
         * Can be partially applied.
         *
         * @param {String} interval1
         * @param {String} interval2
         * @return {String} the resulting interval
         * @example
         * import { add } from "tonal-distance"
         * add("3m", "5P") // => "7m"
         */
        function add(ivl1, ivl2) {
            if (arguments.length === 1) { return function(i2) { return add(ivl1, i2); }; }
            return addIntervals(ivl1, ivl2, 1);
        }

        /**
         * Subtract two intervals
         *
         * Can be partially applied
         *
         * @param {String} minuend
         * @param {String} subtrahend
         * @return {String} interval diference
         */
        function subtract(ivl1, ivl2) {
            if (arguments.length === 1) { return function(i2) { return add(ivl1, i2); }; }
            return addIntervals(ivl1, ivl2, -1);
        }

        /**
         * Find the interval between two pitches. It works with pitch classes
         * (both must be pitch classes and the interval is always ascending)
         *
         * Can be partially applied
         *
         * @param {String} from - distance from
         * @param {String} to - distance to
         * @return {String} the interval distance
         *
         * @example
         * import { interval } from "tonal-distance"
         * interval("C2", "C3") // => "P8"
         * interval("G", "B") // => "M3"
         *
         * @example
         * import * as Distance from "tonal-distance"
         * Distance.interval("M2", "P5") // => "P4"
         */
        function interval(from, to) {
            if (arguments.length === 1) { return function(t) { return interval(from, t); }; }
            var f = encodeNote(from);
            var t = encodeNote(to);
            if (f === null || t === null || f.length !== t.length) { return null; }
            var d =
                f.length === 1 ? [t[0] - f[0], -Math.floor(((t[0] - f[0]) * 7) / 12)] : [t[0] - f[0], t[1] - f[1]];
            return tonalInterval.build(decodeIvl(d));
        }

        /**
         * Get the distance between two notes in semitones
         *
         * @param {String|Pitch} from - first note
         * @param {String|Pitch} to - last note
         * @return {Integer} the distance in semitones or null if not valid notes
         * @example
         * import { semitones } from "tonal-distance"
         * semitones("C3", "A2") // => -3
         * // or use tonal
         * Tonal.Distance.semitones("C3", "G3") // => 7
         */
        function semitones(from, to) {
            if (arguments.length === 1) { return function(t) { return semitones(from, t); }; }
            var f = tonalNote.props(from);
            var t = tonalNote.props(to);
            return f.midi !== null && t.midi !== null ?
                t.midi - f.midi :
                f.chroma !== null && t.chroma !== null ?
                (t.chroma - f.chroma + 12) % 12 :
                null;
        }

        exports.transpose = transpose;
        exports.trFifths = trFifths;
        exports.fifths = fifths;
        exports.transposeBy = transposeBy;
        exports.addIntervals = addIntervals;
        exports.add = add;
        exports.subtract = subtract;
        exports.interval = interval;
        exports.semitones = semitones;

    }, { "tonal-interval": 4, "tonal-note": 6 }],
    4: [function(require, module, exports) {
        'use strict';

        Object.defineProperty(exports, '__esModule', { value: true });

        var IVL_TNL = "([-+]?\\d+)(d{1,4}|m|M|P|A{1,4})";
        var IVL_STR = "(AA|A|P|M|m|d|dd)([-+]?\\d+)";
        var REGEX = new RegExp("^" + IVL_TNL + "|" + IVL_STR + "$");
        var SIZES = [0, 2, 4, 5, 7, 9, 11];
        var TYPES = "PMMPPMM";
        var CLASSES = [0, 1, 2, 3, 4, 5, 6, 5, 4, 3, 2, 1];
        var NAMES = "1P 2m 2M 3m 3M 4P 5P 6m 6M 7m 7M 8P".split(" ");
        var names = function(types) {
            return typeof types !== "string" ?
                NAMES.slice() :
                NAMES.filter(function(n) { return types.indexOf(n[1]) !== -1; });
        };
        var tokenize = function(str) {
            var m = REGEX.exec("" + str);
            if (m === null)
                return null;
            return (m[1] ? [m[1], m[2]] : [m[4], m[3]]);
        };
        var NO_IVL = Object.freeze({
            name: null,
            num: null,
            q: null,
            step: null,
            alt: null,
            dir: null,
            type: null,
            simple: null,
            semitones: null,
            chroma: null,
            oct: null
        });
        var fillStr = function(s, n) { return Array(Math.abs(n) + 1).join(s); };
        var qToAlt = function(type, q) {
            if (q === "M" && type === "M")
                return 0;
            if (q === "P" && type === "P")
                return 0;
            if (q === "m" && type === "M")
                return -1;
            if (/^A+$/.test(q))
                return q.length;
            if (/^d+$/.test(q))
                return type === "P" ? -q.length : -q.length - 1;
            return null;
        };
        var altToQ = function(type, alt) {
            if (alt === 0)
                return type === "M" ? "M" : "P";
            else if (alt === -1 && type === "M")
                return "m";
            else if (alt > 0)
                return fillStr("A", alt);
            else if (alt < 0)
                return fillStr("d", type === "P" ? alt : alt + 1);
            else
                return null;
        };
        var numToStep = function(num) { return (Math.abs(num) - 1) % 7; };
        var properties = function(str) {
            var t = tokenize(str);
            if (t === null)
                return NO_IVL;
            var p = {
                num: 0,
                q: "d",
                name: "",
                type: "M",
                step: 0,
                dir: -1,
                simple: 1,
                alt: 0,
                oct: 0,
                semitones: 0,
                chroma: 0,
                ic: 0
            };
            p.num = +t[0];
            p.q = t[1];
            p.step = numToStep(p.num);
            p.type = TYPES[p.step];
            if (p.type === "M" && p.q === "P")
                return NO_IVL;
            p.name = "" + p.num + p.q;
            p.dir = p.num < 0 ? -1 : 1;
            p.simple = (p.num === 8 || p.num === -8 ?
                p.num :
                p.dir * (p.step + 1));
            p.alt = qToAlt(p.type, p.q);
            p.oct = Math.floor((Math.abs(p.num) - 1) / 7);
            p.semitones = p.dir * (SIZES[p.step] + p.alt + 12 * p.oct);
            p.chroma = ((((p.dir * (SIZES[p.step] + p.alt)) % 12) + 12) %
                12);
            return Object.freeze(p);
        };
        var cache = {};

        function props(str) {
            if (typeof str !== "string")
                return NO_IVL;
            return cache[str] || (cache[str] = properties(str));
        }
        var num = function(str) { return props(str).num; };
        var name = function(str) { return props(str).name; };
        var semitones = function(str) { return props(str).semitones; };
        var chroma = function(str) { return props(str).chroma; };
        var ic = function(ivl) {
            if (typeof ivl === "string")
                ivl = props(ivl).chroma;
            return typeof ivl === "number" ? CLASSES[ivl % 12] : null;
        };
        var build = function(_a) {
            var _b = _a === void 0 ? {} : _a,
                num = _b.num,
                step = _b.step,
                alt = _b.alt,
                _c = _b.oct,
                oct = _c === void 0 ? 1 : _c,
                dir = _b.dir;
            if (step !== undefined)
                num = step + 1 + 7 * oct;
            if (num === undefined)
                return null;
            if (typeof alt !== "number")
                return null;
            var d = typeof dir !== "number" ? "" : dir < 0 ? "-" : "";
            var type = TYPES[numToStep(num)];
            return (d + num + altToQ(type, alt));
        };
        var simplify = function(str) {
            var p = props(str);
            if (p === NO_IVL)
                return null;
            var intervalProps = p;
            return intervalProps.simple + intervalProps.q;
        };
        var invert = function(str) {
            var p = props(str);
            if (p === NO_IVL)
                return null;
            var intervalProps = p;
            var step = (7 - intervalProps.step) % 7;
            var alt = intervalProps.type === "P" ? -intervalProps.alt : -(intervalProps.alt + 1);
            return build({ step: step, alt: alt, oct: intervalProps.oct, dir: intervalProps.dir });
        };
        var IN = [1, 2, 2, 3, 3, 4, 5, 5, 6, 6, 7, 7];
        var IQ = "P m M m M P d P m M m M".split(" ");
        var fromSemitones = function(num) {
            var d = num < 0 ? -1 : 1;
            var n = Math.abs(num);
            var c = n % 12;
            var o = Math.floor(n / 12);
            return d * (IN[c] + 7 * o) + IQ[c];
        };

        exports.names = names;
        exports.tokenize = tokenize;
        exports.qToAlt = qToAlt;
        exports.altToQ = altToQ;
        exports.props = props;
        exports.num = num;
        exports.name = name;
        exports.semitones = semitones;
        exports.chroma = chroma;
        exports.ic = ic;
        exports.build = build;
        exports.simplify = simplify;
        exports.invert = invert;
        exports.fromSemitones = fromSemitones;

    }, {}],
    5: [function(require, module, exports) {
        'use strict';

        Object.defineProperty(exports, '__esModule', { value: true });

        var tonalArray = require('tonal-array');
        var tonalNote = require('tonal-note');
        var tonalDistance = require('tonal-distance');

        var arguments$1 = arguments;

        var MODES = "major dorian phrygian lydian mixolydian minor locrian ionian aeolian".split(
            " "
        );
        var NUMS = [0, 1, 2, 3, 4, 5, 6, 0, 5];
        var NOTES = "C D E F G A B".split(" ");

        var TRIADS = ["", "m", "m", "", "", "m", "dim"];
        var SEVENTHS = "Maj7 m7 m7 Maj7 7 m7 m7b5".split(" ");
        var DEGREES = "I II III IV V VI VII".split(" ");
        var FIFTHS = [0, 2, 4, -1, 1, 3, 5, 0, 3];

        var modenum = function(mode) { return NUMS[MODES.indexOf(mode)]; };

        /**
         * Get a list of valid mode names. The list of modes will be always in
         * increasing order (ionian to locrian)
         *
         * @function
         * @param {Boolean} alias - true to get aliases names
         * @return {Array} an array of strings
         * @example
         * Key.modes() // => [ "ionian", "dorian", "phrygian", "lydian",
         * // "mixolydian", "aeolian", "locrian" ]
         * Key.modes(true) // => [ "ionian", "dorian", "phrygian", "lydian",
         * // "mixolydian", "aeolian", "locrian", "major", "minor" ]
         */
        var modeNames = function(aliases) { return aliases === true ? MODES.slice() : MODES.slice(0, 7); };

        /**
         * Create a major key from alterations
         *
         * @function
         * @param {Integer} alt - the alteration number (positive sharps, negative flats)
         * @return {Key} the key object
         * @example
         * Key.fromAlter(2) // => "D major"
         */
        var fromAlter = function(i) { return tonalDistance.trFifths("C", i) + " major"; };

        var names = function(alt) {
            if (alt === void 0) alt = 4;

            alt = Math.abs(alt);
            var result = [];
            for (var i = -alt; i <= alt; i++) { result.push(fromAlter(i)); }
            return result;
        };

        var NO_KEY = Object.freeze({
            name: null,
            tonic: null,
            mode: null,
            modenum: null,
            intervals: [],
            scale: [],
            alt: null,
            acc: null
        });

        var properties = function(name) {
            var p = tokenize(name);
            if (p[0] === null) { return NO_KEY; }
            var k = { tonic: p[0], mode: p[1] };
            k.name = k.tonic + " " + k.mode;
            k.modenum = modenum(k.mode);
            var cs = tonalArray.rotate(k.modenum, NOTES);
            k.alt = tonalDistance.fifths("C", k.tonic) - FIFTHS[MODES.indexOf(k.mode)];
            k.acc = tonalNote.altToAcc(k.alt);
            k.intervals = cs.map(tonalDistance.interval(cs[0]));
            k.scale = k.intervals.map(tonalDistance.transpose(k.tonic));
            return Object.freeze(k);
        };

        var memo = function(fn, cache) {
            if (cache === void 0) cache = {};

            return function(str) { return cache[str] || (cache[str] = fn(str)); };
        };

        /**
         * Return the a key properties object with the following information:
         *
         * - name {String}: name
         * - tonic {String}: key tonic
         * - mode {String}: key mode
         * - modenum {Number}: mode number (0 major, 1 dorian, ...)
         * - intervals {Array}: the scale intervals
         * - scale {Array}: the scale notes
         * - acc {String}: accidentals of the key signature
         * - alt {Number}: alteration number (a numeric representation of accidentals)
         *
         * @function
         * @param {String} name - the key name
         * @return {Object} the key properties object or null if not a valid key
         *
         * @example
         * Key.props("C3 dorian") // => { tonic: "C", mode: "dorian", ... }
         */
        var props = memo(properties);

        /**
         * Get scale of a key
         *
         * @function
         * @param {String|Object} key
         * @return {Array} the key scale
         *
         * @example
         * Key.scale("A major") // => [ "A", "B", "C#", "D", "E", "F#", "G#" ]
         * Key.scale("Bb minor") // => [ "Bb", "C", "Db", "Eb", "F", "Gb", "Ab" ]
         * Key.scale("C dorian") // => [ "C", "D", "Eb", "F", "G", "A", "Bb" ]
         * Key.scale("E mixolydian") // => [ "E", "F#", "G#", "A", "B", "C#", "D" ]
         */
        var scale = function(str) { return props(str).scale; };

        /**
         * Get a list of key scale degrees
         * @param {String} keyName
         * @return {Array}
         * @example
         * Key.degrees("C major") => ["I", "ii", "iii", "IV", "V", "vi", "vii"]
         */
        var degrees = function(str) {
            var p = props(str);
            if (p.name === null) { return []; }
            var chords = tonalArray.rotate(p.modenum, SEVENTHS);
            return chords.map(function(chord, i) {
                var deg = DEGREES[i];
                return chord[0] === "m" ? deg.toLowerCase() : deg;
            });
        };

        /**
         * Get a list of the altered notes of a given Key. The notes will be in
         * the same order than in the key signature.
         *
         * @function
         * @param {String} key - the key name
         * @return {Array}
         *
         * @example
         * Key.alteredNotes("Eb major") // => [ "Bb", "Eb", "Ab" ]
         */
        var alteredNotes = function(name) {
            var alt = props(name).alt;
            if (alt === null) { return null; }
            return alt === 0 ? [] :
                alt > 0 ?
                tonalArray.range(1, alt).map(tonalDistance.trFifths("B")) :
                tonalArray.range(-1, alt).map(tonalDistance.trFifths("F"));
        };

        /**
         * Get a lead-sheet symbols for a given key name
         *
         * This function is currified (so can be partially applied)
         *
         * From http://openmusictheory.com/triads.html
         *
         * A lead-sheet symbol begins with a capital letter (and, if necessary,
         * an accidental) denoting the root of the chord.
         * That letter is followed by information about a chord’s quality:
         *
         * - major triad: no quality symbol is added
         * - minor triad: lower-case “m”
         * - diminished triad: lower-case “dim” or a degree sign “°”
         * - augmented triad: lower-case “aug” or a plus sign “+”
         *
         * @param {Array<String>} symbols - an array of symbols in major scale order
         * @param {String} keyName - the name of the key you want the symbols for
         * @return {function}
         * @see Key.chords
         * @see Key.triads
         *
         * @example
         * const chords = Key.leadsheetSymbols(["M", "m", "m", "M", "7", "m", "dim"])
         * chords("D dorian") //=> ["Dm", "Em", "FM", "G7", "Am", "Bdim", "CM"]
         */
        function leadsheetSymbols(symbols, keyName) {
            if (arguments.length === 1) { return function(name) { return leadsheetSymbols(symbols, name); }; }
            var p = props(keyName);
            if (!p.name) { return []; }
            var names = tonalArray.rotate(p.modenum, symbols);
            return p.scale.map(function(tonic, i) { return tonic + names[i]; });
        }

        /**
         * Get key chords
         *
         * @function
         * @param {String} name - the key name
         * @return {Array}
         *
         * @example
         * Key.chords("A major") // => ["AMaj7", "Bm7", "C#m7", "DMaj7", ..,]
         */
        var chords = leadsheetSymbols(SEVENTHS);

        /**
         * Get key triads
         *
         * @function
         * @param {String} name - the key name
         * @return {Array}
         *
         * @example
         * Key.triads("A major") // => ["AM", "Bm", "C#m", "DM", "E7", "F#m", "G#mb5"]
         */
        var triads = leadsheetSymbols(TRIADS);

        /**
         * Get secondary dominant key chords
         *
         * @function
         * @param {String} name - the key name
         * @return {Array}
         *
         * @example
         * Key.secDomChords("A major") // => ["E7", "F#7", ...]
         */

        var secDomChords = function(name) {
            var p = props(name);
            if (!p.name) { return []; }
            return p.scale.map(function(t) { return tonalDistance.transpose(t, "P5") + "7"; });
        };

        /**
         * Get relative of a key. Two keys are relative when the have the same
         * key signature (for example C major and A minor)
         *
         * It can be partially applied.
         *
         * @function
         * @param {String} mode - the relative destination
         * @param {String} key - the key source
         *
         * @example
         * Key.relative("dorian", "B major") // => "C# dorian"
         * // partial application
         * var minor = Key.relative("minor")
         * minor("C major") // => "A minor"
         * minor("E major") // => "C# minor"
         */
        var relative = function(mode, key) {
            if (arguments$1.length === 1) { return function(key) { return relative(mode, key); }; }
            var num = modenum(mode.toLowerCase());
            if (num === undefined) { return null; }
            var k = props(key);
            if (k.name === null) { return null; }
            return tonalDistance.trFifths(k.tonic, FIFTHS[num] - FIFTHS[k.modenum]) + " " + mode;
        };

        /**
         * Split the key name into its components (pitch class tonic and mode name)
         *
         * @function
         * @param {String} name
         * @return {Array} an array in the form [tonic, key]
         *
         * @example
         * Key.tokenize("C major") // => ["C", "major"]
         */
        var tokenize = function(name) {
            var p = tonalNote.tokenize(name);
            p[3] = p[3].toLowerCase();
            if (p[0] === "" || MODES.indexOf(p[3]) === -1) { return [null, null]; }
            return [p[0] + p[1], p[3]];
        };

        exports.modeNames = modeNames;
        exports.fromAlter = fromAlter;
        exports.names = names;
        exports.props = props;
        exports.scale = scale;
        exports.degrees = degrees;
        exports.alteredNotes = alteredNotes;
        exports.leadsheetSymbols = leadsheetSymbols;
        exports.chords = chords;
        exports.triads = triads;
        exports.secDomChords = secDomChords;
        exports.relative = relative;
        exports.tokenize = tokenize;

    }, { "tonal-array": 2, "tonal-distance": 3, "tonal-note": 6 }],
    6: [function(require, module, exports) {
        'use strict';

        Object.defineProperty(exports, '__esModule', { value: true });

        var NAMES = "C C# Db D D# Eb E F F# Gb G G# Ab A A# Bb B".split(" ");
        var names = function(accTypes) {
            return typeof accTypes !== "string" ?
                NAMES.slice() :
                NAMES.filter(function(n) {
                    var acc = n[1] || " ";
                    return accTypes.indexOf(acc) !== -1;
                });
        };
        var SHARPS = names(" #");
        var FLATS = names(" b");
        var REGEX = /^([a-gA-G]?)(#{1,}|b{1,}|x{1,}|)(-?\d*)\s*(.*)$/;

        function tokenize(str) {
            if (typeof str !== "string")
                str = "";
            var m = REGEX.exec(str);
            return [m[1].toUpperCase(), m[2].replace(/x/g, "##"), m[3], m[4]];
        }
        var NO_NOTE = Object.freeze({
            pc: null,
            name: null,
            step: null,
            alt: null,
            oct: null,
            octStr: null,
            chroma: null,
            midi: null,
            freq: null
        });
        var SEMI = [0, 2, 4, 5, 7, 9, 11];
        var properties = function(str) {
            var tokens = tokenize(str);
            if (tokens[0] === "" || tokens[3] !== "")
                return NO_NOTE;
            var letter = tokens[0],
                acc = tokens[1],
                octStr = tokens[2];
            var p = {
                letter: letter,
                acc: acc,
                octStr: octStr,
                pc: letter + acc,
                name: letter + acc + octStr,
                step: (letter.charCodeAt(0) + 3) % 7,
                alt: acc[0] === "b" ? -acc.length : acc.length,
                oct: octStr.length ? +octStr : null,
                chroma: 0,
                midi: null,
                freq: null
            };
            p.chroma = (SEMI[p.step] + p.alt + 120) % 12;
            p.midi = p.oct !== null ? SEMI[p.step] + p.alt + 12 * (p.oct + 1) : null;
            p.freq = midiToFreq(p.midi);
            return Object.freeze(p);
        };
        var memo = function(fn, cache) {
            if (cache === void 0) { cache = {}; }
            return function(str) { return cache[str] || (cache[str] = fn(str)); };
        };
        var props = memo(properties);
        var name = function(str) { return props(str).name; };
        var pc = function(str) { return props(str).pc; };
        var isMidiRange = function(m) { return m >= 0 && m <= 127; };
        var midi = function(note) {
            if (typeof note !== "number" && typeof note !== "string") {
                return null;
            }
            var midi = props(note).midi;
            var value = midi || midi === 0 ? midi : +note;
            return isMidiRange(value) ? value : null;
        };
        var midiToFreq = function(midi, tuning) {
            if (tuning === void 0) { tuning = 440; }
            return typeof midi === "number" ? Math.pow(2, (midi - 69) / 12) * tuning : null;
        };
        var freq = function(note) { return props(note).freq || midiToFreq(note); };
        var L2 = Math.log(2);
        var L440 = Math.log(440);
        var freqToMidi = function(freq) {
            var v = (12 * (Math.log(freq) - L440)) / L2 + 69;
            return Math.round(v * 100) / 100;
        };
        var chroma = function(str) { return props(str).chroma; };
        var oct = function(str) { return props(str).oct; };
        var LETTERS = "CDEFGAB";
        var stepToLetter = function(step) { return LETTERS[step]; };
        var fillStr = function(s, n) { return Array(n + 1).join(s); };
        var numToStr = function(num, op) {
            return typeof num !== "number" ? "" : op(num);
        };
        var altToAcc = function(alt) {
            return numToStr(alt, function(alt) { return (alt < 0 ? fillStr("b", -alt) : fillStr("#", alt)); });
        };
        var from = function(fromProps, baseNote) {
            if (fromProps === void 0) { fromProps = {}; }
            if (baseNote === void 0) { baseNote = null; }
            var _a = baseNote ?
                Object.assign({}, props(baseNote), fromProps) :
                fromProps,
                step = _a.step,
                alt = _a.alt,
                oct = _a.oct;
            if (typeof step !== "number")
                return null;
            var letter = stepToLetter(step);
            if (!letter)
                return null;
            var pc = letter + altToAcc(alt);
            return oct || oct === 0 ? pc + oct : pc;
        };
        var build = from;

        function fromMidi(num, sharps) {
            if (sharps === void 0) { sharps = false; }
            num = Math.round(num);
            var pcs = sharps === true ? SHARPS : FLATS;
            var pc = pcs[num % 12];
            var o = Math.floor(num / 12) - 1;
            return pc + o;
        }
        var simplify = function(note, sameAcc) {
            if (sameAcc === void 0) { sameAcc = true; }
            var _a = props(note),
                alt = _a.alt,
                chroma = _a.chroma,
                midi = _a.midi;
            if (chroma === null)
                return null;
            var alteration = alt;
            var useSharps = sameAcc === false ? alteration < 0 : alteration > 0;
            return midi === null ?
                pc(fromMidi(chroma, useSharps)) :
                fromMidi(midi, useSharps);
        };
        var enharmonic = function(note) { return simplify(note, false); };

        exports.names = names;
        exports.tokenize = tokenize;
        exports.props = props;
        exports.name = name;
        exports.pc = pc;
        exports.midi = midi;
        exports.midiToFreq = midiToFreq;
        exports.freq = freq;
        exports.freqToMidi = freqToMidi;
        exports.chroma = chroma;
        exports.oct = oct;
        exports.stepToLetter = stepToLetter;
        exports.altToAcc = altToAcc;
        exports.from = from;
        exports.build = build;
        exports.fromMidi = fromMidi;
        exports.simplify = simplify;
        exports.enharmonic = enharmonic;

    }, {}]
}, {}, [1]);