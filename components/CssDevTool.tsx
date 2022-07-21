import * as CSS from 'csstype';
import { createEffect, createSignal } from 'solid-js';
import Input from './Input';
import SuggestionJSON from './autofill';

// interface CssClasses {
//     css: {
//         [k in string]?: string
//     }
// }
type CssClasses = Record<string, Record<string, string>>


const cssStyles = ['align-content ', 'align-items ', 'align-self ', 'animation ', 'animation-delay ', 'animation-direction ', 'animation-duration ', 'animation-fill-mode ', 'animation-iteration-count ', 'animation-name ', 'animation-play-state ', 'animation-timing-function ', 'backface-visibility ', 'background', 'background-attachment', 'background-clip ', 'background-color', 'background-image', 'background-origin ', 'background-position', 'background-repeat', 'background-size ', 'border', 'border-bottom', 'border-bottom-color', 'border-bottom-left-radius ', 'border-bottom-right-radius ', 'border-bottom-style', 'border-bottom-width', 'border-collapse', 'border-color', 'border-image ', 'border-image-outset ', 'border-image-repeat ', 'border-image-slice ', 'border-image-source ', 'border-image-width ', 'border-left', 'border-left-color', 'border-left-style', 'border-left-width', 'border-radius ', 'border-right', 'border-right-color', 'border-right-style', 'border-right-width', 'border-spacing', 'border-style', 'border-top', 'border-top-color', 'border-top-left-radius ', 'border-top-right-radius ', 'border-top-style', 'border-top-width', 'border-width', 'bottom', 'box-shadow ', 'box-sizing ', 'caption-side', 'clear', 'clip', 'color', 'column-count ', 'column-fill ', 'column-gap ', 'column-rule ', 'column-rule-color ', 'column-rule-style ', 'column-rule-width ', 'column-span ', 'column-width ', 'columns ', 'content', 'counter-increment', 'counter-reset', 'cursor', 'direction', 'display', 'empty-cells', 'flex ', 'flex-basis ', 'flex-direction ', 'flex-flow ', 'flex-grow ', 'flex-shrink ', 'flex-wrap ', 'float', 'font', 'font-family', 'font-size', 'font-size-adjust ', 'font-stretch ', 'font-style', 'font-variant', 'font-weight', 'height', 'justify-content ', 'left', 'letter-spacing', 'line-height', 'list-style', 'list-style-image', 'list-style-position', 'list-style-type', 'margin', 'margin-bottom', 'margin-left', 'margin-right', 'margin-top', 'max-height', 'max-width', 'min-height', 'min-width', 'opacity ', 'order ', 'outline', 'outline-color', 'outline-offset ', 'outline-style', 'outline-width', 'overflow', 'overflow-x ', 'overflow-y ', 'padding', 'padding-bottom', 'padding-left', 'padding-right', 'padding-top', 'page-break-after', 'page-break-before', 'page-break-inside', 'perspective ', 'perspective-origin ', 'position', 'quotes', 'resize ', 'right', 'tab-size ', 'table-layout', 'text-align', 'text-align-last ', 'text-decoration', 'text-decoration-color ', 'text-decoration-line ', 'text-decoration-style ', 'text-indent', 'text-justify ', 'text-overflow ', 'text-shadow ', 'text-transform', 'top', 'transform ', 'transform-origin ', 'transform-style ', 'transition ', 'transition-delay ', 'transition-duration ', 'transition-property ', 'transition-timing-function ', 'vertical-align', 'visibility', 'white-space', 'width', 'word-break ', 'word-spacing', 'word-wrap ', 'z-index']


const CssDevTool = (props: {css: CssClasses, setCss: (value: CssClasses) => void}) => {
    const [css, setCss] = createSignal(props.css)
    const [filteredCss, setFilteredCss] = createSignal<Record<string, string[]>>({})
    const [filter, setFilter] = createSignal('')
    const cssKeys = Object.keys(css());

    createEffect(() => {
        let newCss: CssClasses = {}
        Object.keys(css()).forEach(key => {
            if (css()[key] !== undefined) {
                newCss[key] = {}
                Object.keys(css()[key]).forEach(key2 => {
                    if(filteredCss()[key] === undefined) {
                        newCss[key][key2] = css()[key][key2]
                    }
                    else if (!filteredCss()[key].includes(key2)) {
                        newCss[key][key2] = css()[key][key2]
                    }
                })
            }
        })
        
        props.setCss(newCss)
    })
    const newline = (key: string, id: string) => {
        setCss({
            ...css(),
            [key]: {
                ...css()[key],
                ['']: ''
            }
        })
        document.getElementById(id)?.focus()
    }
    return (
        <div style={{width: '100%', "font-size": '14px', "text-align": 'left', "border-radius": '6px', "box-shadow": '0 15px 20px -5px rgba(0, 0, 0, 0.1)', color: '#fafafa', "margin-top": '16px', background: '#202124', "font-family": 'monospace'}}>
            <div style={{padding: '4px', display: 'flex', "background-color": '#292a2d'}}>
                <input placeholder='filter' onInput={(e) => setFilter(e.currentTarget.value)} style={{ padding: '2px 8px', background: '#202124'}} />
            </div>
            {cssKeys.map((key: string, i: number) => {
                return (
                    <div style={{padding: '16px', "border-top": '1px solid #ccc'}}>
                        <p style={{'color': '#7a8080'}}>{key} <span style={{color: '#fafafa'}}>{'{'}</span></p>
                        <div>
                            {
                                Object.keys(css()[key]).map((k: string, j: number) => {
                                    return (
                                        <div style={{
                                            display: (filter() === '' || k.includes(filter())) ? 'flex' : 'none',
                                            }}>
                                        <PropertyLine newline={(str) => newline(key, str)} key={`${i}-${j}`} name={k} value={css()[key][k]}
                                        setProperty={(propName: string) => {
                                            let classKeys = Object.keys(css()[key]);
                                            let newCss: Record<string, string> = {}
                                            
                                            classKeys.forEach((classKey: string) => {
                                                if (classKey === k)
                                                newCss[propName] = css()[key][classKey];
                                                else
                                                newCss[classKey] = css()[key][classKey];
                                            })
                                            setCss({
                                                ...css(),
                                                [key]: newCss
                                            })
                                        }}
                                        setValue={(value: string) => {
                                            setCss({
                                                ...css(),
                                                [key]: {
                                                    ...css()[key],
                                                    [k]: value
                                                }
                                            })
                                        }}
                                        setChecked={(checked: boolean) => {
                                            setFilteredCss(!checked ? {
                                                ...filteredCss(),
                                                [key]: [
                                                    ...(filteredCss()[key] || []),
                                                    k
                                                ]
                                            } : {
                                                ...filteredCss(),
                                                [key]: (filteredCss()[key] || []).filter((classKey: string) => classKey !== k)
                                            })
                                        }}
                                        />
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div style={{width: '100%'}} onClick={() => {
                            newline(key, 'idk')
                        }}>{'}'}</div>
                    </div>
                )   
            })}
        </div>
    )
}

const expandableProperties: Record<string, string[]> = {
    'margin': [
        'margin-top',
        'margin-right',
        'margin-bottom',
        'margin-left'
    ],
    'padding': [
        'padding-top',
        'padding-right',
        'padding-bottom',
        'padding-left'
    ],
    'border': [
        'border-top-width',
        'border-right-width',
        'border-bottom-width',
        'border-left-width',
        'border-style',
        'border-color',
    ]
}

const PropertyLine = (props: {name: string, value: string, setChecked: (val: boolean) => void, setValue: (value: string) => void, setProperty: (value: string) => void, key: string, newline: (id: string) => void}) => {
    const [checked, setChecked] = createSignal(true);
    const [expanded, setExpanded] = createSignal(false);
    const random = Math.random()
    const testEl = document.createElement('div')
    if (expandableProperties[props.name]) {
        testEl.style.setProperty(props.name, props.value)
    }
    return (
        <div>
            <div style={{display: 'flex', "align-items": 'center'}}>
                <input type='checkbox' checked tabIndex={-1} onChange={(e) => {
                    setChecked(!checked())
                    props.setChecked(checked())
                    }} 
                    style={{display: props.name === '' ? 'none' : 'block', background: '#292a2d'}} />
                <span style={{color: '#2bd4a8'}}><Input newline={props.newline} key={props.key} value={props.name} checked={checked()} onChange={props.setProperty} suggestions={cssStyles} val/></span>:
                {props.name.includes('color') && 
                <div style={{width: '10px', height: '10px', "margin-left": '6px', "background-color": props.value, 'margin-top': '1px'}}></div>
                }
                <Input newline={props.newline} key={props.key} value={props.value} checked={checked()} onChange={props.setValue} suggestions={(SuggestionJSON[props.name] || {values: []}).values} val={false}/>;


                <div onClick={() => setExpanded(!expanded())}
                style={{
                    display: Object.keys(expandableProperties).includes(props.name)?'':'none', 
                    cursor: 'pointer'
                    }}>
                    <svg xmlns="http://www.w3.org/2000/svg" style={{width: '16px', height: '16px', 'padding-top': '2px'}} fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </div>
            <div style={{transition: 'all', height: expanded()?'auto':0, overflow: 'hidden'}}>
                {expandableProperties[props.name]?.map((key: string, i: number) => {
                    return (
                        <div style={{display: 'flex', "align-items": 'center', "margin-left": '26px'}}>
                            <span style={{color: '#c586c0', "margin-right": '4px'}}>{key}:</span>
                            <span>{testEl.style.getPropertyValue(key)}</span>
                        </div>
                    ) 
                })}
            </div>
            <div style={{
                display: 'none',
                "margin-left": '15px'
            }}
            id={`${random}-tester`}>
            </div>
        </div>
    )
}
export default CssDevTool;