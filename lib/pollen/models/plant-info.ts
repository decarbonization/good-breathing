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

import { IndexInfo, PollenType } from "./base";

/**
 * This object contains the daily information on specific plant.
 */
export interface PlantInfo {
    /**
     * The plant code name. For example: "COTTONWOOD".
     */
    readonly code: Plant;

    /**
     * A human readable representation of the plant name. Example: “Cottonwood".
     */
    readonly displayName: string;

    /**
     * This object contains data representing specific pollen index value, category and description.
     */
    readonly indexInfo?: IndexInfo;

    /**
     * Contains general information about plants, including details on their seasonality, 
     * special shapes and colors, information about allergic cross-reactions, and plant photos.
     */
    readonly plantDescription?: PlantDescription;

    /**
     * Indication of either the plant is in season or not.
     */
    readonly inSeason?: boolean;
}

/**
 * Lists available plants with varying availability across locations.
 */
export const enum Plant {
    /**
     * Unspecified plant code.
     */
    unspecified = "PLANT_UNSPECIFIED",

    /**
     * Alder is classified as a tree pollen type.
     */
    alder = "ALDER",

    /**
     * Ash is classified as a tree pollen type.
     */
    ash = "ASH",

    /**
     * Birch is classified as a tree pollen type.
     */
    birch = "BIRCH",

    /**
     * Cottonwood is classified as a tree pollen type.
     */
    cottonwood = "COTTONWOOD",

    /**
     * Elm is classified as a tree pollen type.
     */
    elm = "ELM",

    /**
     * Maple is classified as a tree pollen type.
     */
    maple = "MAPLE",

    /**
     * Olive is classified as a tree pollen type.
     */
    olive = "OLIVE",

    /**
     * Juniper is classified as a tree pollen type.
     */
    juniper = "JUNIPER",

    /**
     * Oak is classified as a tree pollen type.
     */
    oak = "OAK",

    /**
     * Pine is classified as a tree pollen type.
     */
    pine = "PINE",

    /**
     * Cypress pine is classified as a tree pollen type.
     */
    cypressPine = "CYPRESS_PINE",

    /**
     * Hazel is classified as a tree pollen type.
     */
    hazel = "HAZEL",

    /**
     * Graminales is classified as a grass pollen type.
     */
    graminales = "GRAMINALES",

    /**
     * Ragweed is classified as a weed pollen type.
     */
    ragweed = "RAGWEED",

    /**
     * Mugwort is classified as a weed pollen type.
     */
    mugwort = "MUGWORT",
}

/**
 * Contains general information about plants, including details on their seasonality, 
 * special shapes and colors, information about allergic cross-reactions, and plant photos.
 */
export interface PlantDescription {
    /**
     * The plant's pollen type. For example: "GRASS".
     */
    readonly type: PollenType;

    /**
     * A human readable representation of the plant family name. Example: "Betulaceae (the Birch family)".
     */
    readonly family: string;

    /**
     * Textual list of explanations of seasons where the pollen is active. Example: "Late winter, spring".
     */
    readonly season: string;

    /**
     * Textual description of the plants' colors of leaves, bark, flowers or seeds that helps identify the plant.
     */
    readonly specialColors: string;

    /**
     * Textual description of the plants' shapes of leaves, bark, flowers or seeds that helps identify the plant.
     */
    readonly specialShapes: string;

    /**
     * Textual description of pollen cross reaction plants. Example: Alder, Hazel, Hornbeam, Beech, Willow, and Oak pollen.
     */
    readonly crossReaction: string;

    /**
     * Link to the picture of the plant.
     */
    readonly picture: URL;

    /**
     * Link to a closeup picture of the plant.
     */
    readonly pictureCloseup: URL;
}
