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
        secureTextEntry: true,
        isValidUser:true,
        isValidPassword:true
    });

    const [password, setPassword] = React.useState('')
    const [email, setEmail] = React.useState('')

    /*useEffect(() => {
        fetch('http://192.168.0.2:3000/login', {
            method:'GET'
        })
        .then(resp => resp.json())
        .then(registration => {
            setData(registration)
        })
    }, [])*/

    const loginData = () => {
        alert(email.email);
        fetch('http://192.168.0.2:3000/login', {
            method:'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({password:password.password, email:email.email})
        })
        .then(resp => resp.text())
        .then(data => {
            console.log(data);
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

    const handlePasswordChange = (val) => {
       if( val.trim().length > 4 ) {
        setPassword({password: val});
        setData({
            ...data,
            password: val,
            isValidPassword:true
        });
        }else{
            setPassword({password: val});
           setData({
            ...data,
            isValidPassword:false
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
            <Text style={styles.text_header}>Welcome!</Text>
        </View>
        <Animatable.View 
            animation="fadeInUpBig"
            style={styles.footer}
        >
            <Text style={styles.text_footer}>Email</Text>
            <View style={styles.action}>
                <FontAwesome 
                    name="user-o"
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
<Text style ={styles.errorMsg}> Username is invalid try again.</Text>
</Animatable.View>
}
            <Text style={[styles.text_footer, {
                marginTop: 35
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
<Text style ={styles.errorMsg}> Password must be 8 characters long.</Text>
</Animatable.View>
}
           
            <View style={styles.button}>
               
                   
              

                <TouchableOpacity
                    onPress={() => loginData()}
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
                 <TouchableOpacity>
                <Text style={{color: '#009387', marginTop:15}}>No Account? Sign Up Here</Text>
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
        fontSize: 18
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
        marginTop: 50
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
    }
  });