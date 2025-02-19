import { useThemeStore } from "@/utils/state/theme";
import { Button } from "./ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog"
import chroma from "chroma-js";
import { get } from "react-hook-form";

const colorNames = {
    "primary": "--p",
    "primary-content": "--pc",

    "secondary": "--s",
    "secondary-content": "--sc",

    "accent": "--a",
    "accent-content": "--ac",

    "neutral": "--n",
    "neutral-content": "--nc",

    "base-100": "--b1",
    "base-200": "--b2",
    "base-300": "--b3",
    "base-content": "--bc",

    "info": "--in",
    "info-content": "--inc",

    "success": "--su",
    "success-content": "--suc",

    "warning": "--wa",
    "warning-content": "--wac",

    "error": "--er",
    "error-content": "--erc",
}

function createCSSFromJSON(json) {
    let css = "";

    for (const key in json) {
        if (json.hasOwnProperty(key)) {
            const value = json[key];

            // Handle nested objects (for more complex themes)
            if (typeof value === 'object' && value !== null) {
                for (const nestedKey in value) {
                    if (value.hasOwnProperty(nestedKey)) {
                        css += `--${key}-${nestedKey}: ${value[nestedKey]};`;
                    }
                }
            } else {
                let cssKey = key;
                let cssValue = value
                if (colorNames[key]) {
                    cssKey = colorNames[key]
                    let colors = chroma(value).oklch()
                    cssValue = `${colors[0] * 100}% ${colors[1]} ${colors[2]}`

                }
                css += `${cssKey}: ${cssValue};`;
            }
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

export default function ThemePreview({ trigger, css: getCSS }) {

    const changeTheme = useThemeStore((state) => state.changeTheme)
    function onClick() {
        const css = getCSS()
        let cssJson = {};
        try {
            css.split('\n').forEach(split => {
                let [key, value] = split.split(":")
                key = key?.replaceAll(`"`, ``).trim()
                value = value?.replaceAll(',', '').replaceAll(`"`, ``).trim()
                cssJson[key] = value

            })
        } catch (e) {
            cssJson = null
            console.error(e)
        }
        applyTheme(cssJson, '#theme-style')
        changeTheme("custom")
    }
    return (
        <Button onClick={onClick}>
            Preview
        </Button>
    )
}

