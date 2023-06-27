import React from "react";
import { View, Text, FlatList, Pressable } from "react-native";
import styles, { Color } from "../../Shared/styles";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { RoutingItems } from "../../Data/RoutingLookups"; //to determine which screen the legislation is to navigate to.

/*
 This component needs to pass to the onpress:
 component name vs database field
partLabel       = heading1_label
sectionNum      = id
sectionHeading  = heading2
*/

const BookmarkScreen = () => {
  const navAid = useNavigation();
  const bookmarks = useSelector(state => state.bookmarks);

  //FOR TESTING PURPOSES
  const forTesting = [
    {
      legislation: "CrimCode",
      sectionNum: "424.1(b)",
      partLabel: "PART X",
      sectionHeading:
        "Breach of Contract, Intimidation and Discrimination Against Trade Unionists",
    },
    {
      legislation: "MVA",
      sectionNum: "3 (4.1)",
      partLabel: "Part 1",
      sectionHeading: "Registration, licence and insurance",
    },
    {
      legislation: "CrimCode",
      sectionNum: "430(3)(b)",
      partLabel: "PART XI",
      sectionHeading: "Mischief",
    },
    {
      legislation: "MVA",
      sectionNum: "3 (10)(c)(Continued)",
      partLabel: "Part 1",
      sectionHeading: "Registration, licence and insurance",
    },
    {
      legislation: "CrimCode",
      sectionNum: "320.14(4)",
      partLabel: "PART VIII.1",
      sectionHeading: "Offences and Punishment",
    },
    {
      legislation: "MVA",
      sectionNum: "126",
      partLabel: "Part 3",
      sectionHeading: "Traffic control signals",
    },
    {
      legislation: "CrimCode",
      sectionNum: "503(3)(b)(ii)",
      partLabel: "PART XVI",
      sectionHeading: "Appearance of Accused before Justice",
    },
  ];
  const renderBookmarkItem = ({ item }) => (
    <View>
      <Pressable
        onPress={() => {
          //determine which screen to navigate to depending on which legislation is being passed.
          const screenRoute = RoutingItems.find(
            legislation => legislation.legislation == item.legislation
          );
          //this will navigation directly to the document that was bookmarked
          navAid.navigate(screenRoute.screenName, {
            sectionNum: item.sectionNum,
            partLabel: item.partLabel,
            sectionHeading: item.sectionHeading,
            legislation: item.legislation,
          });
        }}
      >
        <View style={styles.bookmarkContainer}>
          <View style={styles.bookmarkFlexContainer}>
            <View style={styles.bookmarkFlexOne}>
              <Text style={styles.bookmarkLabelRender}>Legislation: </Text>
            </View>

            <View style={styles.bookmarkFlexTwo}>
              <Text style={styles.bookmarkTextRender}>
                {item.legislation} {item.sectionNum}
              </Text>
            </View>

            <View style={styles.bookmarkFlexOne}>
              <Text style={styles.bookmarkChevronRender}>
                <FontAwesome
                  name="angle-right"
                  size={20}
                  style={{ color: Color.primaryText }}
                />
              </Text>
            </View>
          </View>
          <View>
            {/* as per design spec change, each heading will only be on 1 line with ellipses. */}
            <Text style={styles.bookmarkTitleRender} numberOfLines={1}>
              {item.sectionHeading}
            </Text>
          </View>
        </View>
      </Pressable>
    </View>
  );

  /*Output Section*/

  if (bookmarks.bookmarkArray.length === 0) {
    return (
      <View style={[styles.bookmarkScreenFormatting, styles.centerOnScreen]}>
        <Ionicons
          name="bookmarks-sharp"
          size={200}
          style={{ color: Color.primaryText }}
        />
        <Text style={styles.bookmarkNoneTitleRender}>No Bookmarks Yet</Text>
        <View style={styles.bookmarkNoneLabelRender}>
          <Text
            style={[styles.bookmarkTextRender, styles.bookmarkNoneBoxRender]}
          >
            Keep track of your most popular articles and documents by clicking
            the <FontAwesome name="bookmark" size={15} /> icon.
          </Text>
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.bookmarkScreenFormatting}>
        <View>
          {/* here should be a header/search */}
          {/* here should be a breadcrumb */}
          <FlatList
            //data={bookmarks.bookmarkItem}
            data={forTesting}
            renderItem={renderBookmarkItem}
          />
        </View>
      </View>
    );
  }
};

export default BookmarkScreen;
