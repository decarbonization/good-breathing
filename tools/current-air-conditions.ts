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
import { fulfill, SereneLogEvent } from "serene-front";
import { GetCurrentAirConditions, ExtraComputation } from "../lib/aqi";

program
    .name("pollen-forecast")
    .description("CLI to verify current air conditions APIs")
    .requiredOption("--key <VALUE>", "The Google Maps platform API key to use")
    .requiredOption("--latitude <VALUE>", "The latitude of the location to get current conditions for", parseFloat)
    .requiredOption("--longitude <VALUE>", "The longitude of the location to get current conditions for", parseFloat)
    .option("--localAqi", "Include local AQI in response")
    .option("--healthRecommendations", "Include health recommendations in response")
    .option("--pollutantAdditionalInfo", "Include additional pollutant info")
    .option("--dominantPollutantConcentration", "Include dominant pollutant concentration data")
    .option("--pollutantConcentration", "Include pollutant concentration data");

program.parse();

const opts = program.opts();

const apiKey = new GoogleMapsApiKey(opts.key);

const extraComputations: ExtraComputation[] = [];
if (opts.localAqi) {
    extraComputations.push(ExtraComputation.localAqi);
}
if (opts.healthRecommendations) {
    extraComputations.push(ExtraComputation.healthRecommendations);
}
if (opts.pollutantAdditionalInfo) {
    extraComputations.push(ExtraComputation.pollutantAdditionalInfo);
}
if (opts.dominantPollutantConcentration) {
    extraComputations.push(ExtraComputation.dominantPollutantConcentration);
}
if (opts.pollutantConcentration) {
    extraComputations.push(ExtraComputation.pollutantConcentration);
}
const getCurrentAirConditions = new GetCurrentAirConditions({
    location: {
        latitude: opts.latitude,
        longitude: opts.longitude,
    },
    extraComputations,
    languageCode: "en-US",
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
fulfill({ request: getCurrentAirConditions, authority: apiKey, logger: verboseLogger })
    .then(currentAirConditions => {
        console.info(JSON.stringify(currentAirConditions, undefined, 2));
    }, error => {
        console.error(`Failed: ${error}`);
    });
