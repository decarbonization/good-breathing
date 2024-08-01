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
import { fulfill, noLogger, verboseConsoleLogger } from "serene-front";
import { LocationCoordinates } from "serene-front/data";
import { GoogleMapsApiKey } from "../lib";
import { ExtraComputation, GetCurrentAirConditions } from "../lib/aqi";

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
    .option("--pollutantConcentration", "Include pollutant concentration data")
    .option("-v --verbose", "Log additional information");

program.parse();

const opts = program.opts();

(async () => {
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
        location: new LocationCoordinates(opts.latitude, opts.longitude),
        extraComputations,
        languageCode: "en-US",
    });
    const logger = opts.verbose ? verboseConsoleLogger : noLogger;
    try {
        const results = await fulfill({ request: getCurrentAirConditions, authority: apiKey, logger });
        console.info(JSON.stringify(results, undefined, 2));
    } catch (error) {
        console.error(`Failed: ${error}`);
    }
})();
