import { Image, Text, TouchableOpacity, View } from "react-native";

export default ({ image = false, title, description, onPress }) => {
  const MAX_CHARACTERS = 80;

  return (
    <View
      style={{
        borderWidth: 1,
        borderRadius: 20,
        borderColor: "black",
        width: 200,
        padding: 5,
        margin:5,
      }}
    >
      <Image
        source={{uri:image}}
        style={{ width: 190, height: 180, alignSelf: "center", borderRadius:20 }}
      />
      <Text style={{ textAlign: "center", fontSize: 16, fontWeight: "bold" }}>
      📍{title}
      </Text>
      {/* <Text style={{ fontSize: 14, marginTop: 5 }}>{description}</Text> */}

      <Text style={{height:75}}>
        {description.length > MAX_CHARACTERS
          ? description.substring(0, MAX_CHARACTERS) + "..."
          : description}
      </Text>

      <TouchableOpacity
        onPress={()=>onPress(title)}
        style={{
          backgroundColor: "#007AFF",
          marginTop: 5,
          borderRadius: 10,
          padding: 5,
          alignItems: "center",
        }}
      >
        <Text>Help me plan!</Text>
      </TouchableOpacity>
    </View>
  );
};
