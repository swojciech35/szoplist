import { StyleSheet, Text, View } from "react-native"

type CheckboxProps ={
    isChecked: boolean
}


const CustomCheckbox = (props: CheckboxProps) => {
    let isX = props.isChecked ? "X" : " "
    return (<View style={styles.square}><Text>{isX}</Text></View>)
}

export default CustomCheckbox;

const styles = StyleSheet.create({
    square:{
        backgroundColor: 'white',
        aspectRatio: 1,
        borderWidth:1,
        borderColor: 'black',
        alignItems: 'center',
        justifyContent: 'center'
        
    }
})



