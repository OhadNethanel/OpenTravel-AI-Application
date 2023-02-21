import { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Modal,
  StyleSheet,
} from "react-native";
import SwitchWithIcons from "react-native-switch-with-icons";

import {
  getCountrySuggestions,
  getDetailedInformation,
  getSuggestions,
} from "../api/server";
import CountriesPicker from "../components/CountriesPicker";
import LocationComponent from "../components/LocationComponent";

export default () => {
  const [suggestions, setSuggestions] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);

  const updateAISuggestions = () => {
    setSuggestions(false);
    getSuggestions()
      .then((gptSuggestions) => {
        setSuggestions(gptSuggestions);
      })
      .catch(() => {});
  };

  const [selectedCountrySuggestions, setSelectedCountrySuggestions] =
    useState(false);

  const [searchDetails, setSearchDetails] = useState({
    safeSearch: false,
    extremeSearch: false,
    familyFriendlySearch: false,
  });

  const [loadingIcon, setLoadingIcon] = useState(false);

  const updateAISelectedCountrySuggestions = (country) => {
    setSelectedCountrySuggestions(false);
    if (country) {
      setLoadingIcon(true);
      getCountrySuggestions(country, searchDetails)
        .then((gptSuggestions) => {
          setSelectedCountrySuggestions(gptSuggestions);
        })
        .catch(() => {})
        .finally(() => {
          setLoadingIcon(false);
        });
    }
  };

  useEffect(() => {
    updateAISuggestions();
  }, []);

  const [modalInformation, setModalInformation] = useState({
    visible: false,
    location: false,
    description: false,
  });

  const getLocationDetailedInformation = async (location) => {
    setModalInformation({ visible: true, location: false, description: false });
    try {
      const description = await getDetailedInformation(location);
      setModalInformation({
        ...modalInformation,
        visible: true,
        location,
        description,
      });
    } catch (error) {
      setModalInformation({
        ...modalInformation,
        visible: true,
        location,
        description: `Error, cannot find further information about ${location}, try again later`,
      });
    }
  };

  const LoadingAnimation = () => {
    return (
      <Image
        source={require("../../assets/loading.gif")}
        style={{
          width: 200,
          height: 200,
          alignSelf: "center",
          //   position: "absolute",
        }}
      />
    );
  };

  return (
    <ScrollView style={{ height: "100%", width: "100%" }}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalInformation.visible}
        onRequestClose={() => {
          setModalInformation({
            visible: false,
            location: false,
            description: false,
          });
        }}
      >
        <View
          style={{ height: "100%", backgroundColor: "rgba(200,200,200,0.96)" }}
        >
          <Text style={{ fontSize: 25, textAlign: "center" }}>
            {modalInformation.location}
          </Text>

          {!modalInformation.description ? (
            <LoadingAnimation />
          ) : (
            <Text style={{ fontSize: 17 }}>{modalInformation.description}</Text>
          )}

          <TouchableOpacity
            onPress={() => {
              setModalInformation({
                visible: false,
                location: false,
                description: false,
              });
            }}
            style={{
              height: 40,
              backgroundColor: "grey",
              borderRadius: 50,
              justifyContent: "center",
            }}
          >
            <Text style={{ color: "white", textAlign: "center" }}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <Image
        source={require("../../assets/agencyLogo.png")}
        style={{
          width: 200,
          height: 200,
          alignSelf: "center",
          //   position: "absolute",
        }}
      />

      <View style={{ display: "flex", flexDirection: "row" }}>
        <TouchableOpacity
          onPress={() => {
            setShowSuggestions(!showSuggestions);
          }}
          style={{
            backgroundColor: "grey",
            height: 25,
            width: 35,
            borderRadius: 50,
            justifyContent: "center",
            marginRight: 5,
          }}
        >
          <Text style={{ color: "white", textAlign: "center" }}>
            {showSuggestions ? "➖" : "➕"}
          </Text>
        </TouchableOpacity>

        <Text style={{ textAlign: "left", fontSize: 16 }}>
          {showSuggestions
            ? "Daily AI Recommendations:"
            : "Show Daily AI Recommendations"}
        </Text>

        <TouchableOpacity
          onPress={updateAISuggestions}
          style={{
            marginLeft: "auto",
            backgroundColor: "#eeeee4",
            height: 25,
            width: 35,
            borderRadius: 50,
            justifyContent: "center",
          }}
        >
          <Text style={{ color: "white", textAlign: "center" }}>🔁</Text>
        </TouchableOpacity>
      </View>

      {showSuggestions ? (
        <View style={{ height: 340, alignItems: "center" }}>
          <ScrollView horizontal={true}>
            {suggestions.length ? (
              suggestions.map((suggestion) => {
                return (
                  <LocationComponent
                    onPress={getLocationDetailedInformation}
                    key={suggestion.title}
                    image={suggestion.image}
                    title={suggestion.title}
                    description={suggestion.description}
                  />
                );
              })
            ) : (
              <LoadingAnimation />
            )}
          </ScrollView>
        </View>
      ) : (
        <></>
      )}

      <View style={{ marginTop: 20 }}>
        <Image
          source={require("../../assets/coolText2.png")}
          style={{
            width: "100%",
            height: 60,
            alignSelf: "center",
            resizeMode: "contain",
          }}
        />
        <View>
          <View
            style={{
              display: "flex",
              // flexDirection: "row",
              // padding: 10,
            }}
          >
            <View style={styles.checkbox}>
              <Text>Family friendly places</Text>

              <SwitchWithIcons
                value={searchDetails.familyFriendlySearch}
                onValueChange={() =>
                  setSearchDetails({
                    ...searchDetails,
                    familyFriendlySearch: !searchDetails.familyFriendlySearch,
                  })
                }
              />
            </View>

            <View style={styles.checkbox}>
              <Text>Safe places</Text>

              <SwitchWithIcons
                value={searchDetails.safeSearch}
                onValueChange={() =>
                  setSearchDetails({
                    ...searchDetails,
                    safeSearch: !searchDetails.safeSearch,
                  })
                }
              />
            </View>

            <View style={styles.checkbox}>
              <Text>Extreme places</Text>

              <SwitchWithIcons
                value={searchDetails.extremeSearch}
                onValueChange={() =>
                  setSearchDetails({
                    ...searchDetails,
                    extremeSearch: !searchDetails.extremeSearch,
                  })
                }
              />
            </View>
          </View>

          <Text>Select country to visit:</Text>
          
          <CountriesPicker
            onPickerOpen={() => {}}
            onSelect={updateAISelectedCountrySuggestions}
          />
        </View>

        {selectedCountrySuggestions.length ? (
          <View style={{ height: 340, alignItems: "center" }}>
            <ScrollView horizontal={true}>
              {selectedCountrySuggestions.length ? (
                selectedCountrySuggestions.map((suggestion) => {
                  return (
                    <LocationComponent
                      onPress={getLocationDetailedInformation}
                      key={suggestion.title}
                      image={suggestion.image || null}
                      title={suggestion.title}
                      description={suggestion.description}
                    />
                  );
                })
                
              ) : (
                <></>
              )}
            </ScrollView>
          </View>
        ) : (
          <>{loadingIcon ? <LoadingAnimation /> : <></>}</>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  checkbox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
    marginTop: 2,
  },
});
