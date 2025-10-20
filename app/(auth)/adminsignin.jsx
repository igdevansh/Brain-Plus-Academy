import AsyncStorage from "@react-native-async-storage/async-storage";
import { Formik } from "formik";
import { useRouter } from "expo-router";
import {
  Image,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import logo from "../../assets/images/dinetimelogo.png";
import validationSchema from "../../utils/adminSchema";
const entryImg = require("../../assets/images/Frame.png");

const AdminSignin = () => {
  const router = useRouter();
  // const auth = getAuth();
  // const db = getFirestore();

  // const handleSignup = async (values) => {
  //   try {
  //     const userCredentials = await createUserWithEmailAndPassword(
  //       auth,
  //       values.email,
  //       values.password
  //     );
  //     const user = userCredentials.user;

  //     await setDoc(doc(db, "users", user.uid), {
  //       email: values.email,
  //       createdAt: new Date(),
  //     });

  //     await AsyncStorage.setItem("userEmail", values.email);
  //     await AsyncStorage.setItem("isGuest", "false");

  //     router.push("/home");
  //   } catch (error) {
  //     if (error.code === "auth/email-already-in-use") {
  //       Alert.alert(
  //         "Signup Failed!",
  //         "This email address is already in use. Please use a different email.",
  //         [{ text: "OK" }]
  //       );
  //     } else {
  //       Alert.alert(
  //         "Signup Error",
  //         "An unexpected error occurred. Please try again later.",
  //         [{ text: "OK" }]
  //       );
  //     }
  //   }
  // };

  return (
    <SafeAreaView className="bg-[#282C34] flex-1">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: "center",
              paddingBottom: 20,
            }}
            keyboardShouldPersistTaps="handled"
          >
            <View className="m-1 flex justify-center items-center">
              <Image source={logo} style={{ width: 300, height: 200 }} />
              <Text className="text-lg text-center text-white font-bold mb-10">
                Admin Login
              </Text>

              <View className="w-5/6">
                <Formik
                  initialValues={{ email: "", password: "" }}
                  validationSchema={validationSchema}
                  // onSubmit={handleSignup}
                >
                  {({
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    values,
                    errors,
                    touched,
                  }) => (
                    <View className="w-full">
                      <Text className="text-[#f49b33] mt-2 mb-2">Email</Text>
                      <TextInput
                        className="h-18 border border-white text-white rounded px-2"
                        keyboardType="email-address"
                        onChangeText={handleChange("email")}
                        value={values.email}
                        onBlur={handleBlur("email")}
                      />

                      {touched.email && errors.email && (
                        <Text className="text-red-500 text-xs mb-2">
                          {errors.email}
                        </Text>
                      )}

                      <Text className="text-[#f49b33] mt-4 mb-2">Password</Text>
                      <TextInput
                        className="h-18 border border-white text-white rounded px-2"
                        secureTextEntry
                        onChangeText={handleChange("password")}
                        value={values.password}
                        onBlur={handleBlur("password")}
                      />

                      {touched.password && errors.password && (
                        <Text className="text-red-500 text-xs mb-2">
                          {errors.password}
                        </Text>
                      )}

                      <TouchableOpacity
                        onPress={handleSubmit}
                        className="p-2 my-2 bg-[#f49b33] rounded-lg mt-10"
                      >
                        <Text className="text-lg font-semibold text-center text-black">
                          Sign in
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </Formik>

              </View>
            </View>

            <View className="flex-1">
              <Image
                source={entryImg}
                className="w-full h-full"
                resizeMode="contain"
              />
            </View>
            <StatusBar barStyle="light-content" backgroundColor="#282C34" />
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AdminSignin;
