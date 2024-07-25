/*
 * MIT No Attribution
 * 
 * Copyright 2024 Peter "Kevin" Contreras
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this
 * software and associated documentation files (the "Software"), to deal in the Software
 * without restriction, including without limitation the rights to use, copy, modify,
 * merge, publish, distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
 * PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
 * SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import { describe, expect, it } from "@jest/globals";
import { parseCurrentAirConditions } from "../../../lib/aqi";
import { Color } from "../../../lib";

describe("aqi#models/current-conditions module", () => {
    describe("#parseCurrentAirConditions", () => {
        const rawSubject = `{
            "dateTime": "2024-07-25T19:00:00Z",
            "regionCode": "us",
            "indexes": [
                {
                    "code": "uaqi",
                    "displayName": "Universal AQI",
                    "aqi": 74,
                    "aqiDisplay": "74",
                    "color": {
                        "red": 0.44705883,
                        "green": 0.78431374,
                        "blue": 0.2
                    },
                    "category": "Good air quality",
                    "dominantPollutant": "o3"
                }
            ]
        }`;

        it("should parse date objects", () => {
            const subject = parseCurrentAirConditions(rawSubject);
            expect(subject.dateTime).toStrictEqual(new Date("2024-07-25T19:00:00Z"));
        });

        it("should parse color objects", () => {
            const subject = parseCurrentAirConditions(rawSubject);
            expect(subject.indexes[0].color instanceof Color).toStrictEqual(true);
        });
    });
});
