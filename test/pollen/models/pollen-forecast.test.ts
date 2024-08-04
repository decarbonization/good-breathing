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
import { parsePollenForecast } from "../../../lib/pollen";
import { Color } from "serene-front/data";

describe("pollen#models#pollen-forecast module", () => {
    describe("#parsePollenForecast", () => {
        const rawSubject = `{
            "regionCode": "IL",
            "dailyInfo": [
              {
                "date": {
                  "year": 2023,
                  "month": 7,
                  "day": 11
                },
                "pollenTypeInfo": [
                  {
                    "code": "GRASS",
                    "displayName": "Grass",
                    "inSeason": true,
                    "indexInfo": {
                      "code": "UPI",
                      "displayName": "Universal Pollen Index",
                      "value": 1,
                      "category": "Very Low",
                      "indexDescription": "People with very high allergy to pollen are likely to experience symptoms",
                      "color": {
                        "green": 0.61960787,
                        "blue": 0.22745098
                      }
                    },
                    "healthRecommendations": [
                      "Pollen levels are very low right now. It's a great day to enjoy the outdoors!"
                    ]
                  }
                ],
                "plantInfo": [
                  {
                    "code": "BIRCH",
                    "displayName": "Birch",
                    "inSeason": false,
                    "indexInfo": {
                      "code": "UPI",
                      "displayName": "Universal Pollen Index",
                      "value": 1,
                      "category": "Very Low",
                      "indexDescription": "People with very high allergy to pollen are likely to experience symptoms",
                      "color": {
                        "green": 0.61960787,
                        "blue": 0.22745098
                      }
                    },
                    "plantDescription": {
                      "type": "TREE",
                      "family": "Betulaceae (the Birch family)",
                      "season": "Late winter, spring",
                      "specialColors": "The bark is usually whitish-gray, silver, or sometimes red.",
                      "specialShapes": "Birch leaves are often triangular with jagged edges. The bark on most birch trees has horizontal dark streaks that look like scoring. Birch tree bark is also well-known for its paper-like texture and peeling nature.",
                      "crossReaction": "Alder, Hazel, Hornbeam, Beech, Willow, and Oak pollen. In addition, there may be a higher risk for food allergies like hazelnuts, almonds, peanuts, pears, apples, cherries and carrots.",
                      "picture": "https://storage.googleapis.com/pollen-pictures/birch_full.jpg",
                      "pictureCloseup": "https://storage.googleapis.com/pollen-pictures/birch_closeup.jpg"
                    }
                  }
                ]
              }
            ]
          }`;

        it("should parse date objects", () => {
            const subject = parsePollenForecast(rawSubject);
            expect(subject.dailyInfo[0].date).toStrictEqual(new Date("2023-07-11T00:00:00.000Z"));

            const alternateSubject = parsePollenForecast(`
                {
                    "dailyInfo": [
                        {
                            "date": "2023-07-11T00:00:00.000Z"
                        }
                    ]
                }
            `);
            expect(alternateSubject.dailyInfo[0].date).toStrictEqual(new Date("2023-07-11T00:00:00.000Z"));
        });

        it("should parse url objects", () => {
            const subject = parsePollenForecast(rawSubject);
            const info = subject.dailyInfo[0];
            const plantDescription = info.plantInfo[0].plantDescription!;
            expect(plantDescription.picture instanceof URL).toStrictEqual(true);
            expect(plantDescription.picture).toStrictEqual(new URL("https://storage.googleapis.com/pollen-pictures/birch_full.jpg"));
            expect(plantDescription.pictureCloseup instanceof URL).toStrictEqual(true);
            expect(plantDescription.pictureCloseup).toStrictEqual(new URL("https://storage.googleapis.com/pollen-pictures/birch_closeup.jpg"));
        });

        it("should parse color objects", () => {
            const subject = parsePollenForecast(rawSubject);
            const info = subject.dailyInfo[0];
            const indexInfo = info.plantInfo[0].indexInfo!;
            expect(indexInfo.color instanceof Color).toStrictEqual(true);
        });
    });
});
