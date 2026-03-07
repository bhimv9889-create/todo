import React from 'react'

export default function ColorPicker({ setColor, colors, selectedColor }) {
    const getColorHandler = (color) => setColor(color)

    return (
        <div className='color-wrapper'>
            {colors.map((color, index) => <div className='color' style={{ backgroundColor: color, border: selectedColor === color ? `2px solid black` : "2px solid lightgrey" }} key={index} onClick={() => getColorHandler(color)}></div>)}
        </div>
    )
}
