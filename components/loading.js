export default function Loading(customStyle = {}) {
    console.log(customStyle)

    // const myStyle = customStyle.customStyle
    const isObjectEmpty = Object.keys(customStyle).length === 0

    return (
        <div style={{marginLeft: 'auto', marginRight: 'auto'}}>
            <div style={isObjectEmpty ? {} : customStyle.style}  class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
            {isObjectEmpty && <p style={{textAlign: 'center'}}>Loading..</p>    }
        </div>
    )
}