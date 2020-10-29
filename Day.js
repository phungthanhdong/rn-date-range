'use strict';

import React from 'react';
import {
	StyleSheet,
	TouchableOpacity,
	Text,
	View
} from 'react-native';

export default class Day extends React.Component {

	checkSelectFirst(dates){
		if(!dates) dates = [];
		let flag = false;
		dates.map((entry, index) => {
			if(entry.status == 'selectedTo'){
				flag = true;
			}
		});
		return flag;
	}

	render() {
		let {date, status, disabled, onDayPress, width} = this.props;
		let onPress, textColor, backColor, selectedFromStyle, selectedToStyle, borderTopLeftRadius, borderBottomLeftRadius, borderTopRightRadius, borderBottomRightRadius ;
		let selectedFromStyle_Text, selectedToStyle_Text,  selectedFromStyle_ContainText, selectedToStyle_ContainText; 

		if (disabled) {
			status = 'disabled';
			onPress = null;
		} else {
			onPress = () => {
				onDayPress(date);
			}
		}

		switch (status) {
			case 'disabled':
				backColor = this.props.dayDisabledBackColor;
				textColor = this.props.dayDisabledTextColor;
				break;

			case 'common':
				backColor = this.props.dayCommonBackColor;
				textColor = this.props.dayCommonTextColor;
				break;

			case 'selectedFrom':
				backColor = this.props.dayCommonBackColor; // this.props.daySelectedBackColor;
				textColor = this.props.daySelectedTextColor;
				selectedFromStyle = {
					alignItems:'flex-end',
					borderTopLeftRadius: Math.floor(width/14), 
					borderBottomLeftRadius: Math.floor(width/14), };
				selectedFromStyle_ContainText= this.checkSelectFirst(this.props.days) == true ? {
					backgroundColor:'#C7D3DD', 
					justifyContent: 'center',
					width: Math.floor(width/9), 
					height:Math.floor(width/12),
					borderTopLeftRadius: Math.floor(width/14),
					borderBottomLeftRadius: Math.floor(width/14) 
				} : {
					width: Math.floor(width/7), 
					alignItems: 'center'
				};
				selectedFromStyle_Text = {   width: Math.floor(width/12), height: Math.floor(width/12),
					borderRadius: Math.floor(width/17), backgroundColor: "#436D8F",
					justifyContent: 'center', alignItems: 'center'}
				break;

			case 'selectedTo':
				backColor = this.props.dayCommonBackColor; // this.props.daySelectedBackColor;
				textColor = this.props.daySelectedTextColor;
				selectedToStyle = {
					alignItems:'flex-start',
					borderTopRightRadius: Math.floor(width/14),
					borderBottomRightRadius: Math.floor(width/14), };
				selectedToStyle_ContainText={
					backgroundColor:'#C7D3DD', 
					alignItems:'flex-end',
					justifyContent: 'center',
					width: Math.floor(width/9), 
					height:Math.floor(width/12),
					borderTopRightRadius: Math.floor(width/14),
					borderBottomRightRadius: Math.floor(width/14)
				};
				selectedToStyle_Text = {   
						width: Math.floor(width/12), 
						height: Math.floor(width/12),
					borderRadius: Math.floor(width/17), backgroundColor: "#436D8F",
					justifyContent: 'center', alignItems: 'center'}
				break;

			case 'inRange':
				backColor = this.props.dayInRangeBackColor;
				textColor = this.props.dayInRangeTextColor;
				break;
		}



		const dynamicStyle = {backgroundColor: backColor, width: Math.floor(width/7), height: Math.floor(width/12)};
		const isToday = status === 'common' && new Date().toDateString() === date.toDateString() ? {borderWidth: 1, borderRadius: 15, borderColor: '#004BBB'} : {}
		return (
			<TouchableOpacity  
				activeOpacity={disabled ? 1 : 0.9}
				style={[styles.common, dynamicStyle, selectedFromStyle, selectedToStyle]}
				onPress={onPress}>
				<View style={[selectedFromStyle_ContainText, selectedToStyle_ContainText]} >
				<View style={[selectedFromStyle_Text, selectedToStyle_Text]}>
					<Text style={[{color: textColor}, styles.text, isToday]}>{date.getDate()}</Text>
				</View>
				</View>
			</TouchableOpacity>
		);
	}
}

const styles = StyleSheet.create({
	common: {
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'white',
		marginVertical: 3
	},
	text: {
		padding: 5,
		fontSize: 14,
		width: 30, 
		fontWeight: '500',
		textAlign: 'center',
		backgroundColor: 'transparent'
	}
});