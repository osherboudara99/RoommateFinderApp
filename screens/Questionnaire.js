import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';

import BooleanQuestionnaireSwitch from '../src/components/BooleanQuestionnaireSwitch';
import Input from '../src/components/Input';
import Question from '../src/components/Question';
import Button from '../src/components/Button'

export default function Questionnaire({ navigation }) {
    const window = useWindowDimensions()

    const [questionNumber, setQuestionNumber] = useState(1)

    const nextQuestion = () => {
        if (questionNumber < 12) {
            setQuestionNumber(questionNumber + 1)
        }
    }

    const prevQuestion = () => {
        if (questionNumber > 1) {
            setQuestionNumber(questionNumber - 1)
        }
    }

    const { control, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);
    // implement submit once the Questionnaire API is finished
    console.log(errors);

    return (
        <View style={styles.container}>
            <View style={[styles.form, { width: window.width - 20 }]}>
                <Text style={styles.header}>Question {questionNumber}/12</Text>

                <Question
                    question='What is your location?'
                    display={questionNumber == 1}
                    control={control}
                    rules={{ required: true, min: 5 }}
                    render={
                        ({ field: { onChange, onBlur, value } }) => (
                            <Input
                                style={{ width: window.width - 10 }}
                                onChangeText={onChange}
                                onBlur={onBlur}
                                value={value}
                                keyboardType='number-pad'
                                placeholder='Enter Location/Zip Code'
                            />
                        )
                    }
                    name="Location"
                    defaultValue=""
                />
                <Question
                    question='Do you already have an apartment?'
                    display={questionNumber == 2}
                    control={control}
                    rules={{ required: true }}
                    render={
                        ({ field: { onChange, onBlur, value } }) => (
                            <BooleanQuestionnaireSwitch
                                value={value}
                                trueLabel={'Yes'}
                                falseLabel={'No'}
                            />
                        )
                    }
                    defaultvalue={false}
                    name="hasApartment"
                />

                <Question
                    question='Are you seeking roommates or are you trying to join others?'
                    display={questionNumber == 3}
                    control={control}
                    rules={{ required: true }}
                    render={
                        ({ field: { onChange, onBlur, value } }) => (
                            <BooleanQuestionnaireSwitch
                                value={value}
                                trueLabel={'Seeking'}
                                falseLabel={'Joining'}
                            />
                        )
                    }
                    defaultvalue={false}
                    name="roommateSeeking"
                />

                <Question
                    question='Do you want your own room or are
                    you okay with sharing with others?'
                    display={questionNumber == 4}
                    control={control}
                    rules={{ required: true }}
                    render={
                        ({ field: { onChange, onBlur, value } }) => (
                            <BooleanQuestionnaireSwitch
                                value={value}
                                trueLabel={'My own'}
                                falseLabel={'I would rather share'}
                            />
                        )
                    }
                    defaultvalue={false}
                    name="roommatePreference"
                />

                <Question
                    question='On a scale of 1 to 10, how clean would you consider yourself?'
                    display={questionNumber == 5}
                    control={control}
                    rules={{ required: true, min: 2 }}
                    render={
                        ({ field: { onChange, onBlur, value } }) => (
                            <Input
                                style={{ width: window.width - 10 }}
                                onChangeText={onChange}
                                onBlur={onBlur}
                                value={value}
                                keyboardType='number-pad'
                                placeholder='Anywhere from 1-10'
                            />
                        )
                    }
                    name="Cleanliness"
                    defaultValue=""
                />

                <Question
                    question='What is your budget amount?'
                    display={questionNumber == 6}
                    control={control}
                    rules={{ required: true, min: 5 }}
                    render={
                        ({ field: { onChange, onBlur, value } }) => (
                            <Input
                                style={{ width: window.width - 10 }}
                                onChangeText={onChange}
                                onBlur={onBlur}
                                value={value}
                                keyboardType='number-pad'
                                placeholder='Price range in $'
                            />
                        )
                    }
                    name="Budget"
                    defaultValue=""
                />

                <Question
                    question='Would you consider yourself a smoker or non-smoker?'
                    display={questionNumber == 7}
                    control={control}
                    rules={{ required: true }}
                    render={
                        ({ field: { onChange, onBlur, value } }) => (
                            <BooleanQuestionnaireSwitch
                                value={value}
                                trueLabel={'Smoker'}
                                falseLabel={'Non-smoker'}
                            />
                        )
                    }
                    defaultvalue={false}
                    name="smokerOrNot"
                />

                <Question
                    question='Would you consider yourself pet-friendly or not pet-friendly?'
                    display={questionNumber == 8}
                    control={control}
                    rules={{ required: true }}
                    render={
                        ({ field: { onChange, onBlur, value } }) => (
                            <BooleanQuestionnaireSwitch
                                value={value}
                                trueLabel={'Pet-friendly'}
                                falseLabel={'Not Pet-friendly'}
                            />
                        )
                    }
                    defaultvalue={false}
                    name="petsOrNot"
                />

                <Question
                    question='Zoom Related: Do you use zoom?'
                    display={questionNumber == 9}
                    control={control}
                    rules={{ required: true }}
                    render={
                        ({ field: { onChange, onBlur, value } }) => (
                            <BooleanQuestionnaireSwitch
                                value={value}
                                trueLabel={'Yes'}
                                falseLabel={'No'}
                            />
                        )
                    }
                    defaultvalue={false}
                    name="zoomOrNot"
                />

                <Question
                    question='Zoom Related: Are you okay with others using Zoom?'
                    display={questionNumber == 10}
                    control={control}
                    rules={{ required: true }}
                    render={
                        ({ field: { onChange, onBlur, value } }) => (
                            <BooleanQuestionnaireSwitch
                                value={value}
                                trueLabel={'Yes'}
                                falseLabel={'No'}
                            />
                        )
                    }
                    defaultvalue={false}
                    name="othersUsingZoom"
                />

                <Question
                    question='Zoom Related: Are you okay with being placed in
                    the same room as the other person
                    using zoom?'
                    display={questionNumber == 11}
                    control={control}
                    rules={{ required: true }}
                    render={
                        ({ field: { onChange, onBlur, value } }) => (
                            <BooleanQuestionnaireSwitch
                                value={value}
                                trueLabel={'Yes'}
                                falseLabel={'No'}
                            />
                        )
                    }
                    defaultvalue={false}
                    name="samePlaceZoom"
                />

                <Question
                    question='Zoom Related: If not, do you need a
                    separate room for using zoom?'
                    display={questionNumber == 12}
                    control={control}
                    rules={{ required: true }}
                    render={
                        ({ field: { onChange, onBlur, value } }) => (
                            <BooleanQuestionnaireSwitch
                                value={value}
                                trueLabel={'Yes'}
                                falseLabel={'No'}
                            />
                        )
                    }
                    defaultvalue={false}
                    name="separateRoomZoom"
                />


                <View style={styles.formNavigation}>
                    <Button
                        title='Back'
                        disabled={questionNumber == 1}
                        onPress={prevQuestion}
                        style={styles.buttonLeft}
                    />
                    {questionNumber < 12 && (
                        <Button
                            title='Next'
                            onPress={nextQuestion}
                            style={styles.buttonRight}
                        />
                    )}
                    {questionNumber == 12 && (
                        <Button
                            title='Submit'
                            onPress={handleSubmit(onSubmit)}
                            style={styles.buttonRight}
                        />
                    )}
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        textAlign: 'center',
        fontSize: 24,
        marginBottom: 35
    },
    container: {
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: '#009387',
        height: '100%',
        width: '100%'
    },
    form: {
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 30,
        paddingRight: 30,
        borderRadius: 5,
        maxWidth: 400,
        minHeight: 250,
        maxHeight: 500,
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: '#fff'
    },
    textInput: {
        width: '100%',
        marginLeft: 'auto',
        marginRight: 'auto',
        fontSize: 16
    },
    formNavigation: {
        flexDirection: 'row',
        marginTop: 'auto',
        marginBottom: 10,
        width: '100%'
    },
    buttonLeft: {
        marginLeft: 'auto',
        marginRight: 5
    },
    buttonRight: {
        marginLeft: 5,
        marginRight: 'auto'
    }
})