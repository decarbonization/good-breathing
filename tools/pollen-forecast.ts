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

import { program } from "commander";
import { GoogleMapsApiKey } from "../lib";
import { GetPollenForecast } from "../lib/pollen";
import { fulfill, SereneLogEvent } from "serene-front";
import { LocationCoordinates } from "serene-front/data";

program
    .name("pollen-forecast")
    .description("CLI to verify pollen forecast APIs")
    .requiredOption("--key <VALUE>", "The Google Maps platform API key to use")
    .requiredOption("--latitude <VALUE>", "The latitude of the forecast location", parseFloat)
    .requiredOption("--longitude <VALUE>", "The longitude of the forecast location", parseFloat)
    .option("--days [VALUE]", "How many days to include in the forecast", parseInt, 5)
    .option("--expandPlants", "Include plants description in the forecast");

program.parse();

const opts = program.opts();

const apiKey = new GoogleMapsApiKey(opts.key);
const getForecast = new GetPollenForecast({
    location: new LocationCoordinates(opts.latitude, opts.longitude),
    days: opts.days,
    languageCode: "en-US",
    plantsDescription: opts.expandPlants ?? false,
});

function verboseLogger(event: SereneLogEvent): void {
    switch (event.event) {
        case "willAuthenticate":
            console.error(`+ willAuthenticate <${event.fetchRequest.url}> using ${event.authority}`);
            break;
        case "willRefreshAuthority":
            console.error(`+ willRefreshAuthority ${event.authority}`);
            break;
        case "willFetch":
            console.error(`+ willFetch <${event.fetchRequest.url}>`);
            break;
        case "willParse":
            console.error(`+ willParse ${event.fetchResponse.status} ${event.fetchResponse.statusText}`);
            break;
    }
}
fulfill({ request: getForecast, authority: apiKey, logger: verboseLogger })
    .then(forecast => {
        console.info(JSON.stringify(forecast, undefined, 2));
    }, error => {
        console.error(`Failed: ${error}`);
    });
