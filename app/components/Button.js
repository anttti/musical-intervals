"use strict";

var React = require("react-native");
var {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    PropTypes,
    ActivityIndicatorIOS,
    TouchableNativeFeedback,
    Platform
} = React;

var Button = React.createClass({
    propTypes: Object.assign({},
        {
            textStyle: Text.propTypes.style,
            disabledStyle: Text.propTypes.style,
            children: PropTypes.string.isRequired,
            isDisabled: PropTypes.bool,
            activityIndicatorColor: PropTypes.string,
            onPress: PropTypes.func,
            onPressIn: PropTypes.func,
            onPressOut: PropTypes.func,
            background: (TouchableNativeFeedback.propTypes) ? TouchableNativeFeedback.propTypes.background : PropTypes.any,
        },
    ),

    _renderInnerText: function () {
        return (
            <Text style={[styles.textButton, this.props.textStyle]}>
                {this.props.children}
            </Text>
        );
    },

    render: function () {
        if (this.props.isDisabled === true) {
            return (
                <View style={[styles.button, this.props.style, (this.props.disabledStyle || styles.opacity)]}>
                    {this._renderInnerText()}
                </View>
            );
        } else {
            // Extract Touchable props
            var touchableProps = {
                onPress: this.props.onPress,
                onPressIn: this.props.onPressIn,
                onPressOut: this.props.onPressOut,
            };
            return (
                <TouchableOpacity {...touchableProps}
                    style={[styles.button, this.props.style]}>
                    {this._renderInnerText()}
                </TouchableOpacity>
            );
        }
    }
});

var styles = StyleSheet.create({
    button: {
        height: 44,
        flexDirection: "row",
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        alignSelf: "stretch",
        justifyContent: "center",
    },
    textButton: {
        alignSelf: "center",
        fontSize: 12,
        fontFamily: "Avenir Next",
        fontWeight: "bold",
        color: "#fff"
    },
    opacity: {
        opacity: 0.5,
    },
});

module.exports = Button;
