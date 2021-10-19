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
        firstName: '',
        lastName:'',
        birthDay: '',
        email: '',
        password: '',
        check_textInputChange: false,
        check_firstNameInputChange:false,
        check_lastNameInputChange:false,
         check_birthdayInputChange:false,
        secureTextEntry: true,
        isValidUser:true,
        isValidPassword:true,
        isValidFirstName:true,
        isValidLastName:true,
        isValidBirthday:true,
        isValidButton:true,
    });

    const textInputChange = (val) => {
       let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if( re.test(val) ) {
            setData({
                ...data,
                email: val,
                check_textInputChange: true,
                isValidUser:true
            });
        } else {
            setData({
                ...data,
                email: val,
                check_textInputChange: false,
                isValidUser:false
            });
        }
        if(isValidUser &&   isValidPassword && isValidFirstName &&  isValidLastName && isValidBirthday ){

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
            setData({
                ...data,
                birthDay: val,
                check_birthdayInputChange: false,
                isValidBirthday:false
            });
        } else if (dtDay < 1 || dtDay> 31) {
           setData({
                ...data,
                birthDay: val,
                check_birthdayInputChange: false,
                isValidBirthday:false
            });
    }else if ((dtMonth==4 || dtMonth==6 || dtMonth==9 || dtMonth==11) && dtDay ==31) {
           setData({
                ...data,
                birthDay: val,
                check_birthdayInputChange: false,
                isValidBirthday:false
            });
    }else if (dtMonth == 2) {
        var isleap = (dtYear % 4 == 0 && (dtYear % 100 != 0 || dtYear % 400 == 0));
        if (dtDay> 29 || (dtDay ==29 && !isleap)) {
     setData({
                ...data,
                birthDay: val,
                check_birthdayInputChange: false,
                isValidBirthday:false
            });
    } else{
            setData({
                ...data,
                birthDay: val,
                check_birthdayInputChange: true,
                isValidBirthday:true
            });
       }
    }else{
          setData({
                ...data,
                birthDay: val,
                check_birthdayInputChange: true,
                isValidBirthday:true
            });
    }
        }else {
            setData({
                ...data,
                birthDay: val,
                check_birthdayInputChange: false,
                isValidBirthday:false
            });
        } 
        }else {
            setData({
                ...data,
                birthDay: val,
                check_birthdayInputChange: false,
                isValidBirthday:false
            });
        }
         }else {
            setData({
                ...data,
                birthDay: val,
                check_birthdayInputChange: false,
                isValidBirthday:false
            });
        }
    }
    const handlePasswordChange = (val) => {
       if( val.trim() != '' ) {
        setData({
            ...data,
            password: val,
            isValidPassword:true
        });
        }else{
           setData({
            ...data,
            password: val,
            isValidPassword:false
        });
        }

    }
      const textFirstNameChange= (val) => {
       if( val.trim() != ''  ) {
        setData({
            ...data,
            firstName: val,
            isValidFirstName:true,
            check_firstNameInputChange:true
        });
        }else{
           setData({
            ...data,
            firstName: val,
            isValidFirstName:false,
            check_firstNameInputChange:false,
        });
        }

    }
    const textLastNameChange= (val) => {
       if( val.trim() != ''  ) {
        setData({
            ...data,
            lastName: val,
            isValidLastName:true,
            check_lastNameInputChange:true
        });
        }else{
           setData({
            ...data,
            lastName: val,
            isValidLastName:false,
            check_lastNameInputChange:false,
        });
        }

    }
    

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }
    const handleValidUser= (val)=>{
      alert(val);
     if(val.trim().length >= 4){
       setData({
         ...data,
         isValidUser:true
       });
     }else{
       setData({
         ...data,
         isValidUser:false
       });
     }
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
{data.isValidButton ? null : 
            <View style={styles.button}>
                <TouchableOpacity
                   // onPress={() => navigation.navigate('SignUpScreen')}
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
}
                 <TouchableOpacity>
                <Text style={{color: '#009387', marginTop:15}}>Already have an account? Sign In Here</Text>
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