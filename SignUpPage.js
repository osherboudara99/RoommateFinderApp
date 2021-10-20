import React from 'react';
import { 
    View, 
    Text, 
    Button, 
    TouchableOpacity, 
    Dimensions,
    TextInput,
    Platform,
    StyleSheet ,
    StatusBar
} from 'react-native';
import * as Animatable from 'react-native-animatable';
//import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

const SignInScreen = ({navigation}) => {


    const [data, setData] = React.useState({
        check_textInputChange: false,
        check_firstNameInputChange:false,
        check_lastNameInputChange:false,
         check_birthdayInputChange:false,
        check_phoneInputChange:false,
        secureTextEntry: true,
        isValidUser:true,
        isValidPassword:true,
        isValidFirstName:true,
        isValidLastName:true,
        isValidBirthday:true,
        isValidPhone:true,
        isValidButton:false
    });

    const [firstName, setFirstName] = React.useState('')
    const [lastName, setLastName] = React.useState('')
    const [phone, setPhone] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [birthDay, setBirthDay] = React.useState('')


    const insertSignupData = () => {
        fetch('http://127.0.0.1:5000/signup', {
            method:'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({ firstName:firstName.firstName, lastName:lastName.lastName, phone:phone.phone, password:password.password, email:email.email, birthDay:birthDay.birthDay})
        })
        .then(resp => resp.json())
        .then(info => {
            alert('executed');
        })
        .catch(error => console.log(error))

    }

    const textInputChange = (val) => {
       let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if( re.test(val) ) {
            setEmail({email: val});
            setData({
                ...data,
                check_textInputChange: true,
                isValidUser:true
            });
        } else {
            setEmail({email: val});
            setData({
                ...data,
                check_textInputChange: false,
                isValidUser:false
            });
        }
    }
    const birthdayInputChange = (val) => {
       var validatePattern = /^(\d{4})(\-)(\d{1,2})(\-)(\d{1,2})$/;
       if( val.trim() != ''  ) {
           if(val.trim().length == 10){
       if( validatePattern.test(val) ) {
              
        var dateValues = val.match(validatePattern);
        var dtYear = dateValues[1];        
         var dtMonth = dateValues[3];
          var dtDay=  dateValues[5];
           if (dtMonth < 1 || dtMonth > 12) {
            setBirthDay({birthDay: val});
            setData({
                ...data,
                check_birthdayInputChange: false,
                isValidBirthday:false
            });
        } else if (dtDay < 1 || dtDay> 31) {
            setBirthDay({birthDay: val});
           setData({
                ...data,
                check_birthdayInputChange: false,
                isValidBirthday:false
            });
    }else if ((dtMonth==4 || dtMonth==6 || dtMonth==9 || dtMonth==11) && dtDay ==31) {
            setBirthDay({birthDay: val});
           setData({
                ...data,
                check_birthdayInputChange: false,
                isValidBirthday:false
            });
    }else if (dtMonth == 2) {
        var isleap = (dtYear % 4 == 0 && (dtYear % 100 != 0 || dtYear % 400 == 0));
        if (dtDay> 29 || (dtDay ==29 && !isleap)) {
            setBirthDay({birthDay: val});
     setData({
                ...data,
                check_birthdayInputChange: false,
                isValidBirthday:false
            });
    } else{
        setBirthDay({birthDay: val});
            setData({
                ...data,
                check_birthdayInputChange: true,
                isValidBirthday:true
            });
       }
    }else{
        setBirthDay({birthDay: val});
          setData({
                ...data,
                check_birthdayInputChange: true,
                isValidBirthday:true
            });
    }
        }else {
            setBirthDay({birthDay: val});
            setData({
                ...data,
                check_birthdayInputChange: false,
                isValidBirthday:false
            });
        } 
        }else {
            setBirthDay({birthDay: val});
            setData({
                ...data,
                check_birthdayInputChange: false,
                isValidBirthday:false
            });
        }
         }else {
            setBirthDay({birthDay: val});
            setData({
                ...data,
                check_birthdayInputChange: false,
                isValidBirthday:false
            });
        }
    }
    const handlePasswordChange = (val) => {
       if( val.trim() != '' ) {
        setPassword({password: val});
        setData({
            ...data,
            isValidPassword:true,
            isValidButton:true
        });
        }else{
            setPassword({password: val});
           setData({
            ...data,
            isValidPassword:false,
            isValidButton:false
        });
        }

    }
      const textFirstNameChange= (val) => {
       if( val.trim() != ''  ) {
        setFirstName({
            firstName: val
        });
        setData({
            ...data,
            isValidFirstName:true,
            check_firstNameInputChange:true
        });
        }else{
            setFirstName({firstName: val});
           setData({
            ...data,
            isValidFirstName:false,
            check_firstNameInputChange:false,
        });
        }

    }
    const textLastNameChange= (val) => {
       if( val.trim() != ''  ) {
        setLastName({lastName: val});
        setData({
            ...data,
            isValidLastName:true,
            check_lastNameInputChange:true
        });
        }else{
            setLastName({lastName: val});
           setData({
            ...data,
            isValidLastName:false,
            check_lastNameInputChange:false,
        });
        }

    }

    const phone_validation = (val) =>{
        var rege = /^\d{10}$/
        if(rege.test(val)){
            if(val.trim().length == 10){
                setPhone({phone: val});
                setData({
                    ...data,
                    isValidPhone:true,
                    check_phoneInputChange:true
                });
                }
                else{
                    setPhone({phone: val});
                   setData({
                    ...data,
                    isValidPhone:false,
                    check_phoneInputChange:false,
                });
                }

        }
        else{
            setPhone({phone: val});
            setData({
             ...data,
             isValidPhone:false,
             check_phoneInputChange:false,
         });

    }
}
    

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }


    return (
      <View style={styles.container}>
          <StatusBar backgroundColor='#009387' barStyle="light-content"/>
        <View style={styles.header}>
            <Text style={styles.text_header}>Sign Up!</Text>
        </View>
        <Animatable.View 
            animation="fadeInUpBig"
            style={styles.footer}
        >
        <Text style={styles.text_footer}>First Name</Text>
            <View style={styles.action}>
                <FontAwesome 
                    name="user-o"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    placeholder="Your First Name"
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => textFirstNameChange(val)}
                    
                />
                {data.check_firstNameInputChange ? 
                <Animatable.View
                    animation="bounceIn"
                >
                    <Feather 
                        name="check-circle"
                        color="green"
                        size={20}
                    />
                </Animatable.View>
                : null}
            </View>
             {data.isValidFirstName ? null : 
<Animatable.View animation ="fadeInLeft" duration={500}>
<Text style ={styles.errorMsg}> First Name is Required.</Text>
</Animatable.View>
} 
 <Text style={[styles.text_footer, {
                marginTop: 10
            }]}>Last Name</Text>
            <View style={styles.action}>
                <FontAwesome 
                    name="user-o"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    placeholder="Your Last Name"
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => textLastNameChange(val)}
                    
                />
                {data.check_lastNameInputChange ? 
                <Animatable.View
                    animation="bounceIn"
                >
                    <Feather 
                        name="check-circle"
                        color="green"
                        size={20}
                    />
                </Animatable.View>
                : null}
            </View>
             {data.isValidLastName ? null : 
<Animatable.View animation ="fadeInLeft" duration={500}>
<Text style ={styles.errorMsg}> Last Name is Required.</Text>
</Animatable.View>
} <Text style={[styles.text_footer, {
                marginTop: 10
            }]}>Birthday</Text>
            <View style={styles.action}>
                <FontAwesome 
                    name="calendar-o"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    placeholder="Your Birthday: YYYY-MM-DD"
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => birthdayInputChange(val)}
                    
                />
                {data.check_birthdayInputChange ? 
                <Animatable.View
                    animation="bounceIn"
                >
                    <Feather 
                        name="check-circle"
                        color="green"
                        size={20}
                    />
                </Animatable.View>
                : null}
            </View>
             {data.isValidBirthday ? null : 
<Animatable.View animation ="fadeInLeft" duration={500}>
<Text style ={styles.errorMsg}> Birthday is Invalid.</Text>
</Animatable.View>
} 
            <Text style={[styles.text_footer, {
                marginTop: 10
            }]}>Email</Text>
            <View style={styles.action}>
                <FontAwesome 
                    name="envelope-o"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    placeholder="Your Email"
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => textInputChange(val)}
                    
                />
                {data.check_textInputChange ? 
                <Animatable.View
                    animation="bounceIn"
                >
                    <Feather 
                        name="check-circle"
                        color="green"
                        size={20}
                    />
                </Animatable.View>
                : null}
            </View>
             {data.isValidUser ? null : 
<Animatable.View animation ="fadeInLeft" duration={500}>
<Text style ={styles.errorMsg}> Email is invalid try again.</Text>
</Animatable.View>
}
<Text style={[styles.text_footer, {
                marginTop: 10
            }]}>Phone Number</Text>
            <View style={styles.action}>
                <FontAwesome 
                    name="phone"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    placeholder="Your Phone Number"
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => phone_validation(val)}
                    
                />
                {data.check_phoneInputChange ? 
                <Animatable.View
                    animation="bounceIn"
                >
                    <Feather 
                        name="check-circle"
                        color="green"
                        size={20}
                    />
                </Animatable.View>
                : null}
            </View>
             {data.isValidPhone ? null : 
<Animatable.View animation ="fadeInLeft" duration={500}>
<Text style ={styles.errorMsg}> Phone number is invalid, please try again.</Text>
</Animatable.View>
}
            <Text style={[styles.text_footer, {
                marginTop: 10
            }]}>Password</Text>
            <View style={styles.action}>
                <Feather 
                    name="lock"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    placeholder="Your Password"
                    secureTextEntry={data.secureTextEntry ? true : false}
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => handlePasswordChange(val)}
                />
                <TouchableOpacity
                    onPress={updateSecureTextEntry}
                >
                    {data.secureTextEntry ? 
                    <Feather 
                        name="eye-off"
                        color="grey"
                        size={20}
                    />
                    :
                    <Feather 
                        name="eye"
                        color="grey"
                        size={20}
                    />
                    }
                </TouchableOpacity>
            </View>
            {data.isValidPassword ? null : 
<Animatable.View animation ="fadeInLeft" duration={500}>
<Text style ={styles.errorMsg}> Password is Required.</Text>
</Animatable.View>
}
           
            <View style={styles.button}>
            {data.check_textInputChange && data.isValidButton && data.check_birthdayInputChange && 
            data.check_firstNameInputChange && data.check_lastNameInputChange && data.check_phoneInputChange ?
                <TouchableOpacity
                    onPress={() => insertSignupData()}
                    style={[styles.signIn, {
                        borderColor: '#009387',
                        borderWidth: 1,
                        marginTop: 15
                    }]}
                >
                    <Text style={[styles.textSign, {
                        color: '#009387'
                    }]}>Sign In</Text>
                </TouchableOpacity>
                :null}
                 <TouchableOpacity>
                <Text style={{color: '#009387', marginTop:15}} onPress={() => navigation.popToTop()}>Already have an account? Sign In Here</Text>
            </TouchableOpacity>
            </View>
        </Animatable.View>
      </View>
    );
};

export default SignInScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#009387'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 15
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    button: {
        alignItems: 'center',
        marginTop: 20
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    errorMsg: {
        color: '#ae0700'
    }
  });