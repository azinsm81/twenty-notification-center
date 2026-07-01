# Twenty CRM — Design System Reference
> Typography and component anatomy extracted from Figma design system screenshots.
> Color tokens extracted directly from `__Default_tokens.json`, `__Light_tokens.json`, `__Pink_tokens.json`, `__Green_tokens.json`, `__Purple_tokens.json`.
> This file is the single source of truth for the Notification Center sprint.

---

## Typography

Font family: **Inter** (confirmed by letterform shapes in screenshots)

| Token | Weight | Size | Use |
|---|---|---|---|
| `title-1` | SemiBold 600 | 24px | Page titles, modal headers |
| `title-2` | SemiBold 600 | 20px | Section headers |
| `title-3` | SemiBold 600 | 16px | Card titles, sidebar section labels |
| `big` | Medium 500 | 16px | Emphasis body copy |
| `base-stronger` | SemiBold 600 | 13px | Table column headers, strong labels |
| `base-strong` | Medium 500 | 13px | List item primary text |
| `base-default` | Regular 400 | 13px | Default body, cell content |
| `small` | Medium 500 | 12px | Secondary labels, timestamps |
| `small-regular` | Regular 400 | 12px | Helper text, captions |
| `label-default` | Regular 400 | 11px | Muted labels, disabled states |
| `label-small` | Regular 400 | 10px | Micro labels |

Line height: ~1.4x for body (13px → ~18px), ~1.2x for titles.

---

## Color

> All values below are sourced directly from the JSON token files. No values are inferred.

### Text (`__Default_tokens.json` → `Text`)

| Token name | Hex | Use |
|---|---|---|
| `Text.Primary` | `#333333` | Primary content, headings |
| `Text.Secondary` | `#666666` | Secondary labels, muted body |
| `Text.Tertiary` | `#999999` | Placeholder text, captions |
| `Text.Light` | `#B3B3B3` | Very muted, helper text |
| `Text.Extra light` | `#CCCCCC` | Disabled text |
| `Text.Inverted` | `#FFFFFF` | Text on dark/filled backgrounds |
| `Text.Danger` | `#E5484D` | Error messages, destructive labels |
| `Text.Brand` | theme-dependent | Brand-colored text (see accent themes below) |

### Background (`__Default_tokens.json` → `Background`)

| Token name | Hex | Use |
|---|---|---|
| `Background.Primary` | `#FFFFFF` | Main canvas, cards, panels |
| `Background.Secondary` | `#FCFCFC` | Subtle offset surface |
| `Background.tertiary` | `#F1F1F1` | Hover rows, section zones |
| `Background.Quarternary` | `#EBEBEB` | Active/pressed states, tag bg |
| `Background.Inverted - Primary` | `#333333` | Dark surfaces, tooltips |
| `Background.Inverted - Secondary` | `#666666` | Secondary dark surfaces |
| `Background.Danger` | `#FFEFEF` | Error banner bg, danger chip bg |
| `Background.Brand` | theme-dependent | Brand-tinted background (see accent themes below) |

### Borders (`__Default_tokens.json` → `Borders`)

| Token name | Hex | Use |
|---|---|---|
| `Borders.Light` | `#F1F1F1` | Subtle dividers |
| `Borders.Medium` | `#EBEBEB` | Standard input borders, table lines |
| `Borders.Stronger` | `#D6D6D6` | Focused-adjacent, active borders |
| `Borders.Inverted` | `#333333` | Borders on dark backgrounds |
| `Borders.Danger` | `#FFE5E5` | Error input border |
| `Borders.Brand` | theme-dependent | Brand-colored border (see accent themes below) |

### Gray Scale (`__Light_tokens.json` → `Grays.Gray`)

| Step | Hex | Use |
|---|---|---|
| Gray.1 | `#FFFFFF` | |
| Gray.2 | `#FCFCFC` | |
| Gray.3 | `#F9F9F9` | |
| Gray.4 | `#F1F1F1` | |
| Gray.5 | `#EBEBEB` | |
| Gray.6 | `#D6D6D6` | |
| Gray.7 | `#CCCCCC` | |
| Gray.8 | `#B3B3B3` | |
| Gray.9 | `#999999` | |
| Gray.10 | `#838383` | |
| Gray.11 | `#666666` | |
| Gray.12 | `#333333` | |

### Danger / Red (`__Light_tokens.json` → `Colors.Red`)

| Step | Hex |
|---|---|
| Red.1 | `#FFFCFC` |
| Red.3 | `#FFEFEF` |
| Red.4 | `#FFE5E5` |
| Red.9 | `#E5484D` ← **danger primary** |
| Red.10 | `#DC3D43` |
| Red.11 | `#CD2B31` |

### Accent Themes
Twenty supports swappable brand accent colors. The semantic tokens `Text.Brand`, `Background.Brand`, and `Borders.Brand` change per theme. The `Accent` scale (1–12) maps to the chosen color.

#### Default — Indigo
| Token | Hex |
|---|---|
| `Text.Brand` | `#3E63DD` |
| `Background.Brand` | `#F0F4FF` |
| `Borders.Brand` | `#E6EDFE` |
| `Accent.9` (primary) | `#3E63DD` |
| `Accent.3` (light bg) | `#F0F4FF` |
| `Accent.4` (border) | `#E6EDFE` |
| `Accent.8` (hover) | `#8DA4EF` |
| `Accent.10` (pressed) | `#3A5CCC` |
| `Accent.11` (dark) | `#3451B2` |

#### Pink theme
| Token | Hex |
|---|---|
| `Text.Brand` | `#D6409F` |
| `Background.Brand` | `#FEEEF8` |
| `Borders.Brand` | `#FCE5F3` |
| `Accent.9` (primary) | `#D6409F` |

#### Green theme
| Token | Hex |
|---|---|
| `Text.Brand` | `#30A46C` |
| `Background.Brand` | `#E9F9EE` |
| `Borders.Brand` | `#DDF3E4` |
| `Accent.9` (primary) | `#30A46C` |

#### Purple theme
| Token | Hex |
|---|---|
| `Text.Brand` | `#8E4EC6` |
| `Background.Brand` | `#F9F1FE` |
| `Borders.Brand` | `#F3E7FC` |
| `Accent.9` (primary) | `#8E4EC6` |

> For sprint work, assume **Default (Indigo)** theme unless told otherwise. Use `Accent.9` (`#3E63DD`) as the primary brand color anywhere brand/accent is needed.

### Chip Color Palette (status tags)
Sourced from `Colors.*` in `__Light_tokens.json`. Each color: step .3 as background, step .9 as text/dot.

| Color | Background (step 3) | Text/dot (step 9) |
|---|---|---|
| Tomato | `#FFF0EE` | `#E54D2E` |
| Red | `#FFEFEF` | `#E5484D` |
| Crimson | `#FEEFF6` | `#E93D82` |
| Pink | `#FEEEF8` | `#D6409F` |
| Plum | `#FCEFFC` | `#AB4ABA` |
| Purple | `#F9F1FE` | `#8E4EC6` |
| Violet | `#F5F2FF` | `#6E56CF` |
| Indigo | `#F0F4FF` | `#3E63DD` |
| Blue | `#EDF6FF` | `#0091FF` |
| Cyan | `#E7F9FB` | `#05A2C2` |
| Teal | `#E7F9F5` | `#12A594` |
| Green | `#E9F9EE` | `#30A46C` |
| Grass | `#EBF9EB` | `#46A758` |
| Lime | `#EEFADC` | `#99D52A` |
| Yellow | `#FFFBD1` | `#F5D90A` |
| Amber | `#FFF4D5` | `#FFB224` |

---

## Spacing

Eight-point base grid. All values are multiples of 4px.

| Token | Value | Use |
|---|---|---|
| `space-1` | 4px | Icon-to-label gap, micro padding |
| `space-2` | 8px | Internal component padding (chip, badge) |
| `space-3` | 12px | Compact row padding, button padding |
| `space-4` | 16px | Standard cell padding, card padding |
| `space-5` | 20px | Section internal padding |
| `space-6` | 24px | Section gap |
| `space-8` | 32px | Major section break |
| `space-12` | 48px | Page-level spacing |

---

## Border Radius

| Token | Value | Use |
|---|---|---|
| `radius-sm` | 4px | Inputs, table cells, small interactive elements |
| `radius-md` | 6px | Buttons, dropdown menus, cards |
| `radius-lg` | 8px | Modals, larger panels |
| `radius-pill` | 9999px | Chips, tags, badges, avatars |

---

## Elevation / Shadow

| Token | Value | Use |
|---|---|---|
| `shadow-sm` | `0 1px 3px rgba(0,0,0,0.08)` | Dropdown menus, date picker |
| `shadow-md` | `0 4px 12px rgba(0,0,0,0.10)` | Modals, command palette |
| `shadow-focus` | `0 0 0 2px #C6D4F9` | Focus ring (Indigo Accent.6) |

---

## Buttons

Height: ~28px (compact) / 32px (standard). Horizontal padding: 12px. Gap icon-to-label: 4px. Radius: 6px.

| Variant | Background | Border | Text | Hover bg |
|---|---|---|---|---|
| Default | `#FFFFFF` | `#EBEBEB` | `#333333` | `#F1F1F1` |
| Primary (brand) | `#3E63DD` | none | `#FFFFFF` | `#3A5CCC` |
| Dark | `#333333` | none | `#FFFFFF` | `#666666` |
| Danger | `#E5484D` | none | `#FFFFFF` | `#DC3D43` |
| Outline brand | `#FFFFFF` | `#3E63DD` | `#3E63DD` | `#F0F4FF` |
| Outline danger | `#FFFFFF` | `#E5484D` | `#E5484D` | `#FFEFEF` |
| Ghost | transparent | none | `#666666` | `#F1F1F1` |
| Disabled (any) | — | — | `#CCCCCC` | none |

---

## Inputs

Height: ~32px. Radius: 4px. Padding: 8px 12px.

| State | Border | Background |
|---|---|---|
| Default | `#EBEBEB` | `#FFFFFF` |
| Hover | `#D6D6D6` | `#FFFFFF` |
| Focus/Active | `#3E63DD` | `#FFFFFF` |
| Disabled | `#EBEBEB` | `#F1F1F1` |
| Error | `#E5484D` | `#FFFFFF` |

Icon prefix: 16px, color `#999999`. Error icon turns `#E5484D`.

---

## Chips / Tags

Pill shape. Two sizes:

| Size | Height | Padding | Font |
|---|---|---|---|
| Regular | 20px | 4px 8px | `base-default` 13px |
| Medium | 16px | 2px 6px | `small` 12px |

Variants: Filled · Outlined · With dot (`• Label`) · Dismissible (`Label ×`) · With toggle.

---

## Checkboxes & Toggles

**Checkbox:** 16px square, radius 4px.
- Unchecked: border `#EBEBEB`, bg white
- Checked: bg `#3E63DD`, white checkmark
- Indeterminate: bg `#3E63DD`, white dash
- Disabled: opacity 0.4
- Circle (radio) variant: same, radius 9999px

**Toggle:** 32px × 18px.
- Off: bg `#D6D6D6`, white thumb
- On: bg `#3E63DD`, white thumb
- Thumb: 14px circle, shadow-sm. Transition: 200ms spring.

---

## Navigation (Sidebar)

Width: ~240px. Background: `#FFFFFF`. Border-right: `1px solid #EBEBEB`.
Nav item: height ~32px, padding 0 8px, radius 6px, icon-to-label gap 8px.

| State | Background | Text | Icon |
|---|---|---|---|
| Default | transparent | `#333333` | `#999999` |
| Hover | `#F1F1F1` | `#333333` | `#333333` |
| Active | `#F1F1F1` | `#333333` | `#3E63DD` |
| Disabled | transparent | `#CCCCCC` | `#CCCCCC` |

---

## Table

Row height: ~36px. Column padding: 0 16px.
Header: `base-stronger` 13px SemiBold `#333333`. Cell: `base-default` 13px `#333333`.

| State | Row background |
|---|---|
| Default | `#FFFFFF` |
| Hover | `#F1F1F1` |
| Selected | `#F0F4FF` (Accent.3) |

---

## Menus / Dropdowns

Background: `#FFFFFF`. Border: `1px solid #EBEBEB`. Shadow: `shadow-sm`. Radius: 6px. Padding: 4px.
Item height: ~32px. Item padding: 0 12px. Item radius: 4px.

| State | Background | Text |
|---|---|---|
| Default | transparent | `#333333` |
| Hover | `#F1F1F1` | `#333333` |
| Selected | `#F1F1F1` | `#333333` + checkmark |
| Danger | transparent | `#E5484D` |
| Danger hover | `#FFEFEF` | `#E5484D` |
| Disabled | transparent | `#CCCCCC` |

---

## Icons

**Lucide** icon set. Stroke: 1.5px. Sizes: 16px and 20px. Color inherits from text context.

Common: `Bell` · `Building` · `User` · `Target` · `CheckSquare` · `FileText` · `BarChart2` · `Settings` · `Search` · `Plus` · `ArrowUpRight` · `ChevronDown` · `ChevronRight`

---

## Cells (Inline Editing)

Hover shows pencil / external-link icon at 16px, color `#999999`.
Active/editing cell: full `#3E63DD` border, `#FFFFFF` bg.

Cell types: Text · Relation (chips) · Select/Multi-select (color chips) · Boolean (`✓ True` / `✗ False`) · Date · Number (right-aligned) · URL · Attachment.

---

## Notification Bell States

| State | Icon color | Label weight | Background |
|---|---|---|---|
| No notifications | `#999999` | Regular | transparent |
| Has notifications | `#FFB224` (Amber.9) | SemiBold | transparent |
| Active / open | `#3E63DD` | SemiBold | `#F1F1F1` |
| Focused | `#333333` | SemiBold | `#F1F1F1` + focus ring |

---

## Notification Center — Primitive Map

| Design element | Token / component to use |
|---|---|
| Priority P1 chip | Red chip: bg `#FFEFEF`, text `#E5484D` |
| Priority P2 chip | Amber chip: bg `#FFF4D5`, text `#FFB224` |
| Priority P3 chip | Gray: bg `#EBEBEB`, text `#999999` |
| Notification row | Table row anatomy, 36px, hover `#F1F1F1` |
| Inline action button | Default button, 28px, border `#EBEBEB` |
| Record link chip | Relation chip, pill, bg `#F1F1F1` |
| Bell badge (numeric) | Red `#E5484D` circle, 16px, `small` white text |
| Empty state header | `title-3` SemiBold `#333333` |
| Empty state body | `base-default` Regular `#666666` |
| Empty state CTA | Primary button, brand `#3E63DD` |
