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

/**
 * Health recommendations for different population groups in a free text format.
 * The recommendations are derived from their associated air quality conditions.
 */
export interface HealthRecommendations {
    /**
     * No specific sensitivities.
     */
    readonly generalPopulation: string;

    /**
     * Retirees and people older than the general population.
     */
    readonly elderly: string;

    /**
     * Respiratory related problems and asthma suffers.
     */
    readonly lungDiseasePopulation: string;

    /**
     * Heart and circulatory system diseases.
     */
    readonly heartDiseasePopulation: string;

    /**
     * Sports and other strenuous outdoor activities.
     */
    readonly athletes: string;

    /**
     * Women at all stages of pregnancy.
     */
    readonly pregnantWomen: string;

    /**
     * Younger populations including children, toddlers, and babies.
     */
    readonly children: string;
}
