import { useThemeStore } from "@/utils/state/theme";
import { Button } from "./ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog"
import chroma from "chroma-js";
import { get } from "react-hook-form";
import { interpolate, useMode as notAHookUseMode, oklch, wcagContrast } from "culori";
import { useEffect } from "react";

const colorNames = {
    "primary": "--p",
    "secondary": "--s",
    "accent": "--a",
    "neutral": "--n",
    "base-100": "--b1",
    "info": "--in",
    "success": "--su",
    "warning": "--wa",
    "error": "--er",
}


const optionalColors = {
    "primary-content": {
        cssKey: "--pc",
        value: "primary",
        type: "contrast"
    },
    "secondary-content": {
        cssKey: "--sc",
        value: "secondary",
        type: "contrast"
    },
    "accent-content": {
        cssKey: "--ac",
        value: "accent",
        type: "contrast"
    },
    "neutral-content": {
        cssKey: "--nc",
        value: "neutral",
        type: "contrast"
    },
    "base-200": {
        cssKey: "--b2",
        value: "base-100",
        type: "darken"
    },
    "base-300": {
        cssKey: "--b3",
        value: "base-100",
        type: "darken"
    },
    "base-content": {
        cssKey: "--bc",
        value: "base-100",
        type: "contrast"
    },
    "info-content": {
        cssKey: "--inc",
        value: "info",
        type: "contrast"
    },
    "success-content": {
        cssKey: "--suc",
        value: "success",
        type: "contrast"
    },
    "warning-content": {
        cssKey: "--wac",
        value: "warning",
        type: "contrast"
    },
    "error-content": {
        cssKey: "--erc",
        value: "error",
        type: "contrast"
    },
}

const colorObjToString = (input) => {
    const cut = (number) => {
        if (!number) {
            return 0
        }
        return +number.toFixed(4)
    }
    const { l, c, h } = input
    return `${cut(l) * 100}% ${cut(c)} ${cut(h)}`
}


const isDark = (color) => {
    console.log(color, "hhuh")
    if (wcagContrast(color, "black") < wcagContrast(color, "white")) {
        console.log(color, "hhuh2")
        return true
    }

    console.log(color, "hhuh2")
    return false
}

const generateForegroundColorFrom = (input, percentage = 0.8) => {
    const result = interpolate([input, isDark(input) ? "white" : "black"], "oklch")(percentage)
    return `${colorObjToString(result)}`
}
const generateDarkenColorFrom = (input, percentage = 0.07) => {
    const result = interpolate([input, "black"], "oklch")(percentage)
    return `${colorObjToString(result)}`
}

function darken(input, percentage = 0.2) {
    return generateDarkenColorFrom(input, percentage)
}
function contrastMaker(input, percentage = 0.8) {
    return generateForegroundColorFrom(input, percentage)
}

function generateOptionalColours(colors) {
    Object.entries(optionalColors).forEach(([color, value]) => {
        if (!colors[color] && colors[value.value]) {
            console.log(colors[value.value], value, "hmmmm")
            colors[value.cssKey] = optionalColors[color].type === "contrast" ? contrastMaker(colors[value.value]) : darken(colors[value.value])
        }
    })
}
function createCSSFromJSON(json) {
    let css = "";

    for (const key in json) {
        if (json.hasOwnProperty(key)) {
            const value = json[key];
            let cssKey = key?.replace("--color-", "").trim();
            let cssValue = value;
            console.log(cssKey)
            if (cssValue?.includes("oklch(") && (colorNames[cssKey] || optionalColors[cssKey])) {
                cssValue = cssValue.replace("oklch(", "")
                cssValue = cssValue.replace(")", "")
                cssKey = colorNames[cssKey] || optionalColors[cssKey].cssKey
            } else if (colorNames[cssKey] || optionalColors[cssKey]) {
                cssKey = colorNames[cssKey] || optionalColors[cssKey].cssKey
                cssValue = chroma(cssValue).css("oklch")
                cssValue = cssValue.replace("oklch(", "")
                cssValue = cssValue.replace(")", "")
                console.log(cssValue)
            }

            css += `${cssKey}: ${cssValue};`;
        }
    }

    return `[data-theme=custom] {
      ${css}
    }`;
}


function applyTheme(themeJSON, selector = '[data-theme]') { // Added selector parameter
    const cssString = createCSSFromJSON(themeJSON);
    console.log(cssString)
    // Create or get the style element (make it unique if needed)
    let styleElement = document.getElementById('theme-style');
    if (!styleElement) {
        styleElement = document.createElement('style');
        styleElement.id = 'theme-style'; // Consider a more specific ID if you have multiple themes
        document.head.appendChild(styleElement);
    }

    // Apply the CSS with the specified selector
    styleElement.innerText = `${cssString}  `; // Wrap in the selector
}

export default function ThemePreview({ trigger, css: getCSS, mode }) {
    useEffect(() => {
        try {
            notAHookUseMode(oklch)
        } catch { }
    }, [])
    const changeTheme = useThemeStore((state) => state.changeTheme)
    function onClick() {
        const css = getCSS()
        let cssJson = {};
        try {
            css.split('\n').forEach(split => {
                let [key, value] = split.split(":")
                key = key?.replaceAll(`"`, ``).replaceAll("'", "").trim()
                value = value?.replaceAll(',', '').replaceAll(`"`, ``).replaceAll("'", "").trim()
                if (key && value) {
                    cssJson[key] = value
                }

            })
        } catch (e) {
            cssJson = null
            console.error(e)
        }
        console.log(cssJson)
        if (mode === "v4") {
            generateOptionalColours(cssJson)
        }

        applyTheme(cssJson, '#theme-style')
        changeTheme("custom")
    }
    return (
        <Button onClick={onClick} type="button" className="text-secondary-content bg-secondary mt-2 w-full">
            Preview
        </Button>
    )
}

