# Country Flags Integration Guide

This guide explains how country flags have been integrated into the booking system using the ISO country code standard.

## Overview

We've implemented country flags using the flag CDN service (flagcdn.com) which provides SVG and PNG formats of country flags. The flags are identified by their 2-letter ISO-3166 country codes.

## Implementation Details

1. **Data Source**: Created a `countries.js` file in the `src/data` directory that contains a comprehensive list of countries with their ISO codes and names.

2. **Flag API**: We use two CDN sources for flags to ensure reliability:
   - Primary source: "https://flagcdn.com/w20/[country-code].png"
   - Fallback source: "https://raw.githubusercontent.com/hampusborgos/country-flags/main/png100px/[country-code].png"

3. **Components Updated**:
   - `BookingDetailsRight.jsx`: Updated the nationality dropdown to include flags
   - `BookingDetails.jsx`: Added passenger summary with nationality flags

4. **Nationality Handling**:
   - Added mapping between nationality names (e.g., "Indian") and country names (e.g., "India")
   - Implemented robust ISO code resolution with multiple fallbacks

## How to Use Flags

To display a flag for a specific country:

```jsx
<img 
  src={`https://flagcdn.com/w20/${countryCode}.png`} 
  alt={countryName}
  className="h-4 w-6 object-cover rounded-sm" 
  onError={(e) => {
    // Try fallback URL first
    const isoCode = getCountryISOCode(nationality);
    e.target.src = `https://raw.githubusercontent.com/hampusborgos/country-flags/main/png100px/${isoCode}.png`;
    e.target.onerror = (e2) => {
      // If that also fails, default to India flag
      e2.target.src = 'https://flagcdn.com/w20/in.png';
      e2.target.onerror = null;
    };
  }}
/>
```

Where:
- `countryCode` is the lowercase 2-letter ISO code (e.g., "us", "in", "gb")
- `getCountryISOCode()` handles mapping nationality names to country ISO codes

## Size Options

The flag URL can be adjusted for different sizes:
- `w20` - 20px width (used in our implementation)
- `w40` - 40px width
- `w80` - 80px width
- `w160` - 160px width
- `w320` - 320px width

## Nationality to Country Mapping

To convert nationality names to country ISO codes, we've implemented a comprehensive mapping system:

1. First, we check against a predefined mapping of nationalities to countries (e.g., "Indian" → "India")
2. Then we look for the country name in our countries.js file
3. If both fail, we use a hardcoded list of nationality to ISO code mappings
4. Finally, we default to "in" (India) if all else fails

## Credits

The flags are sourced from the [country-flags](https://github.com/hampusborgos/country-flags) repository which provides accurate renders of all world flags in SVG and PNG format.

## Notes

- The flags are in public domain, but there may be other restrictions on how specific flags can be used according to individual country laws.
- Our implementation includes a dual-layer fallback system to ensure flags always display 