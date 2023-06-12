function Switch(props){

    function onCheckSwitch(){
        if (props.checkedSwitch){
            props.cancelCheckSwitch();
        } else {
            props.onCheckSwitch();
        }
    }
    return(
        <label className="switch">
            <input onChange={onCheckSwitch} className="switch__checkbox" type="checkbox" checked={props.checkedSwitch} /> 
            <span className="switch__slider"></span>
        </label>
    )
}
export default Switch;