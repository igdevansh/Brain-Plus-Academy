import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";
import { Formik } from "formik";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import logo from "../../assets/images/dinetimelogo.png";
import validationSchema from "../../utils/teacherstudentSchema";
const entryImg = require("../../assets/images/Frame.png");

const TeacherSignin = () => {
  const router = useRouter();
  //   const auth = getAuth();
  //   const db = getFirestore();

  //   const handleSignin = async (values) => {
  //     try {
  //       const userCredentials = await createUserWithEmailAndPassword(
  //         auth,
  //         values.email,
  //         values.password
  //       );
  //       const user = userCredentials.user;

  //       await setDoc(doc(db, "users", user.uid), {
  //         email: values.email,
  //         createdAt: new Date(),
  //       });

  //       await AsyncStorage.setItem("userEmail", values.email);
  //       await AsyncStorage.setItem("isGuest", "false");

  //       router.push("/home");
  //     } catch (error) {
  //       if (error.code === "auth/email-already-in-use") {
  //         Alert.alert(
  //           "Signin Failed!",
  //           "This email address is already in use. Please use a different email.",
  //           [{ text: "OK" }]
  //         );
  //       } else {
  //         Alert.alert(
  //           "Signin Error",
  //           "An unexpected error occurred. Please try again later.",
  //           [{ text: "OK" }]
  //         );
  //       }
  //     }
  //   };

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
                Let&apos;s get you started
              </Text>

              <View className="w-5/6">
                <Formik
                  initialValues={{ email: "", name: "", class: "" }}
                  validationSchema={validationSchema}
                  // onSubmit={handleSignin}
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

                      <Text className="text-[#f49b33] mt-4 mb-2">Name</Text>
                      <TextInput
                        className="h-18 border border-white text-white rounded px-2"
                        onChangeText={handleChange("name")}
                        value={values.name}
                        onBlur={handleBlur("name")}
                      />

                      {touched.name && errors.name && (
                        <Text className="text-red-500 text-xs mb-2">
                          {errors.name}
                        </Text>
                      )}

                      <Text className="text-[#f49b33] mt-4 mb-2">Class</Text>
                      <View className="border border-white rounded">
                        <Picker
                          selectedValue={values.class}
                          onValueChange={(itemValue) =>
                            handleChange("class")(itemValue)
                          }
                          onBlur={handleBlur("class")}
                          dropdownIconColor="white"
                          style={{ color: "white", height: 50 }}
                        >
                          <Picker.Item label="Select Class" value="" />
                          <Picker.Item label="1st Class" value="1" />
                          <Picker.Item label="2nd Class" value="2" />
                          <Picker.Item label="3rd Class" value="3" />
                          <Picker.Item label="4th Class" value="4" />
                          <Picker.Item label="5th Class" value="5" />
                          <Picker.Item label="6th Class" value="6" />
                          <Picker.Item label="7th Class" value="7" />
                          <Picker.Item label="8th Class" value="8" />
                          <Picker.Item label="9th Class" value="9" />
                          <Picker.Item label="10th Class" value="10" />
                          <Picker.Item label="11th Class" value="11" />
                          <Picker.Item label="12th Class" value="12" />
                          <Picker.Item label="CS" value="CS" />
                        </Picker>
                      </View>

                      {touched.class && errors.class && (
                        <Text className="text-red-500 text-xs mb-2">
                          {errors.class}
                        </Text>
                      )}

                      <TouchableOpacity
                        onPress={handleSubmit}
                        className="p-2 my-2 bg-[#f49b33] rounded-lg mt-10"
                      >
                        <Text className="text-lg font-semibold text-center text-black">
                          Sign In
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

export default TeacherSignin;
