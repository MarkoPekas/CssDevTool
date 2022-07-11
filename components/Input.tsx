import { createEffect, createSignal } from "solid-js";
import styles from "./styles.module.css";
const cssStyles = ['align-content ', 'align-items ', 'align-self ', 'animation ', 'animation-delay ', 'animation-direction ', 'animation-duration ', 'animation-fill-mode ', 'animation-iteration-count ', 'animation-name ', 'animation-play-state ', 'animation-timing-function ', 'backface-visibility ', 'background', 'background-attachment', 'background-clip ', 'background-color', 'background-image', 'background-origin ', 'background-position', 'background-repeat', 'background-size ', 'border', 'border-bottom', 'border-bottom-color', 'border-bottom-left-radius ', 'border-bottom-right-radius ', 'border-bottom-style', 'border-bottom-width', 'border-collapse', 'border-color', 'border-image ', 'border-image-outset ', 'border-image-repeat ', 'border-image-slice ', 'border-image-source ', 'border-image-width ', 'border-left', 'border-left-color', 'border-left-style', 'border-left-width', 'border-radius ', 'border-right', 'border-right-color', 'border-right-style', 'border-right-width', 'border-spacing', 'border-style', 'border-top', 'border-top-color', 'border-top-left-radius ', 'border-top-right-radius ', 'border-top-style', 'border-top-width', 'border-width', 'bottom', 'box-shadow ', 'box-sizing ', 'caption-side', 'clear', 'clip', 'color', 'column-count ', 'column-fill ', 'column-gap ', 'column-rule ', 'column-rule-color ', 'column-rule-style ', 'column-rule-width ', 'column-span ', 'column-width ', 'columns ', 'content', 'counter-increment', 'counter-reset', 'cursor', 'direction', 'display', 'empty-cells', 'flex ', 'flex-basis ', 'flex-direction ', 'flex-flow ', 'flex-grow ', 'flex-shrink ', 'flex-wrap ', 'float', 'font', 'font-family', 'font-size', 'font-size-adjust ', 'font-stretch ', 'font-style', 'font-variant', 'font-weight', 'height', 'justify-content ', 'left', 'letter-spacing', 'line-height', 'list-style', 'list-style-image', 'list-style-position', 'list-style-type', 'margin', 'margin-bottom', 'margin-left', 'margin-right', 'margin-top', 'max-height', 'max-width', 'min-height', 'min-width', 'opacity ', 'order ', 'outline', 'outline-color', 'outline-offset ', 'outline-style', 'outline-width', 'overflow', 'overflow-x ', 'overflow-y ', 'padding', 'padding-bottom', 'padding-left', 'padding-right', 'padding-top', 'page-break-after', 'page-break-before', 'page-break-inside', 'perspective ', 'perspective-origin ', 'position', 'quotes', 'resize ', 'right', 'tab-size ', 'table-layout', 'text-align', 'text-align-last ', 'text-decoration', 'text-decoration-color ', 'text-decoration-line ', 'text-decoration-style ', 'text-indent', 'text-justify ', 'text-overflow ', 'text-shadow ', 'text-transform', 'top', 'transform ', 'transform-origin ', 'transform-style ', 'transition ', 'transition-delay ', 'transition-duration ', 'transition-property ', 'transition-timing-function ', 'vertical-align', 'visibility', 'white-space', 'width', 'word-break ', 'word-spacing', 'word-wrap ', 'z-index']

const Input = (props: {val:boolean, value: string, key: string, suggestions: string[], onChange: (value: string) => void, checked: boolean}) => {
    const [focused, setFocused] = createSignal(false);
    const [value, setValue] = createSignal(props.value || '');
    const [suggestions, setSuggestions] = createSignal(props.suggestions);
    const [selected, setSelected] = createSignal(0);
    const random = props.key;
    createEffect(() => {
        setSuggestions(props.suggestions.filter((style: string) =>style.toLowerCase().indexOf(value().toLowerCase()) > -1))
        setSelected(0)
    })
    return (
        <div style={{position: 'relative'}}>
            <div contentEditable
            onInput={(e) => {
                setValue(e.currentTarget.textContent||'');
            }}
            onFocus={() => {
                    setFocused(true);
            }} onBlur={() => {
                    setFocused(false);
                    props.onChange(value());
            }} 
            onKeyDown={(e) => {
                if (e.key === 'ArrowDown') {
                    setSelected(selected()+1<suggestions().length?selected() + 1:selected());
                    document.getElementById(`map-${selected()}-${random}`)?.scrollIntoView()
                    e.preventDefault();
                    if(suggestions().length === 0) {
                        if(!isNaN(parseInt(value()))){
                            setValue(`${parseInt(value())-1}${value().replace(/[0-9]/g, '')}`)
                            let el = document.getElementById(`input-${props.val?'val':'prop'}-${random}`)
                            if(el)
                            el.innerHTML = value()
                        }
                    }
                }
                if (e.key === 'ArrowUp') {
                    setSelected(selected()>0?selected() - 1:0);
                    document.getElementById(`map-${selected()}-${random}`)?.scrollIntoView()
                    e.preventDefault();
                    if(suggestions().length === 0) {
                        if(!isNaN(parseInt(value()))){
                            setValue(`${parseInt(value())+1}${value().replace(/[0-9]/g, '')}`)
                            let el = document.getElementById(`input-${props.val?'val':'prop'}-${random}`)
                            if(el)
                            el.innerHTML = value()
                        }
                    }
                }
                if(e.key === 'Enter') {
                    let el = document.getElementById(`input-${props.val?'val':'prop'}-${random}`)
                    if(el){
                        el.innerHTML = suggestions()[selected()];
                    }
                    if(suggestions()[selected()] !== undefined){
                        setValue(suggestions()[selected()]);
                    }
                    document.getElementById(`input-${props.val?'val':'prop'}-${random}`)?.blur();
                    
                    if(props.val){
                        document.getElementById(`input-prop-${random}`)?.focus();
                        console.log(`input-prop-${random}`)
                    }else{
                        let s = random.split('-')
                        document.getElementById(`input-val-${s[0]}-${parseInt(s[1])+1}`)?.focus();
                    }
                    e.preventDefault();
                }
            }}
            id={`input-${props.val?'val':'prop'}-${random}`}
            style={{"padding-left": '2px', "margin-left": '6px', "padding-right": '2px', 'text-decoration': props.checked?'':'line-through'}}>
                {props.value}
            </div>
            <div style={{position: 'absolute', "z-index": 10, width: '200px', "max-height": '140px', "overflow-y": 'auto', 'border': '1px solid gray',display: (focused()&&suggestions().length>0)?'':'none'}}>
                {suggestions().map((suggestion: string, i: number) => {
                    return (
                        <div id={`map-${i}-${random}`} class={styles.item} 
                        onMouseDown={() => {
                            let el = document.getElementById(`input-${props.val?'val':'prop'}-${random}`)
                            if (el)
                            el.innerHTML = suggestion;
                            setValue(suggestion);
                        }}
                        style={
                            selected() === i ? {
                                background: '#66f',
                                color: 'white'
                            }:{}
                        }>
                            {suggestion}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Input;