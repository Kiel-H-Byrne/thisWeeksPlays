import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Box, FormControl, Text } from "@chakra-ui/react";
import React from "react";

interface Props {
  orderId: string;
  userId: string;
  upVotes: string[];
  downVotes: string[];
}

const VerifyField = ({ userId = "", upVotes }: Props) => {
  // const [field, meta, helpers] = useField("verify");
  // field.onChange = (e) => {
  // getSymbolSet(e.target.value);
  // helpers.setValue(e.target.value);
  // };

  // const setInputValue = (symbol) => {
  // helpers.setValue(symbol);
  // setResults([]);
  // };

  const handleClick = () => {
    //if username is in watched, remove, if not, add
    console.log(upVotes, userId)
    if (userId && upVotes.length > 0) {
      if (upVotes.includes(userId)) {
        upVotes.pop()
        //send POST request to update this orders upvotes field
      } else {
        upVotes.push(userId)
        //send POST request to update this orders upvotes field
      }
    } else {
      console.log("no uid?");
    }

  }
  const in_watched = () => {
    //if verifiedListings array contains order id, return true.
    if (userId && upVotes.length > 0) {
      return upVotes.includes(userId);
    } else {
      return false;
    }
  };
  // const in_unwatched = () => {
  //   //if verifiedListings array contains order id, return true.
  //   if (userId && downVotes.length > 0) {
  //     return downVotes.includes(userId);
  //   } else {
  //     return false;
  //   }
  // };
  const upVoteCount = () => {
    return upVotes.length;
  };

  return (
    <FormControl id="watch-control">
      <Box className="watchButton" display="flex" justifyContent="flex-end">
        <Box className="watch" onClick={handleClick}>
          {in_watched() ? (
            <ViewOffIcon className={`unwatch`} />
          ) : (
            <ViewIcon className={`watched`} />
          )}
        </Box>
        <Text className="vote-count" paddingInline="3">{upVoteCount() > 0 ? `${upVoteCount()} Watchers` : `Watch This`}</Text>
        {/* <span className="unWatch"></span> */}
      </Box>
    </FormControl>
  );
};

export default VerifyField;

// 'click .verify': function(event,templateInstance) {
//   event.stopPropagation();

//   if (Meteor.user()) {
//     let docId = orderId;
//     let userId = userId;
//     // Meteor.users.update({
//     //   _id: userId
//     // },{
//     //   $addToSet: {"profile.verifiedListings" : docId}
//     // });
//     const updateDoc = {
//       $addToSet: {
//          verifiers: userId
//       },
//       $pull: {
//         deverifiers: userId
//       }
//     };
//     Meteor.call('editListing', docId, updateDoc);
//     // Listings.update({
//     //   _id: docId
//     // },{
//     //   $addToSet: {
//     //      verifiers: userId
//     //   },
//     //   $pull: {
//     //     deverifiers: userId
//     //   }
//     // });

//     analytics.track( "Verified Listing", {
//       category: "Listings",
//       label: this.name,
//       value: orderId
//     });

//     analytics.track( "Verified Listing", {
//       category: "Listings",
//       label: "User Id",
//       value: userId
//     });

//   } else {
//     Materialize.toast('Log In Before Verifying A Listing', 3000, 'myToast');
//   }
// },
// 'click .deverify': function(event,templateInstance) {
//   event.stopPropagation();
//   if (Meteor.user()) {
//     let docId = orderId;
//     let userId = userId;
//     // Meteor.users.update({
//     //   _id: userId
//     // },{
//     //   $pull: {"profile.verifiedListings" : docId}
//     // });
//     const updateDoc = {
//       $addToSet: {
//          deverifiers: userId
//       },
//       $pull: {
//         verifiers: userId
//       }
//     };
//     Meteor.call('editListing', docId, updateDoc);

//     // Listings.update({
//     //   _id: docId
//     // },{
//     //   $addToSet: {
//     //     deverifiers: userId
//     //   },
//     //   $pull: {
//     //     verifiers: userId
//     //   }
//     // });

//     analytics.track( "Untrusted Listing", {
//       category: "Listings",
//       label: this.name,
//       value: orderId
//     });

//     analytics.track( "Untrusted Listing", {
//       category: "Listings",
//       label: "User Id",
//       value: userId
//     });

//   } else {
//     Materialize.toast('Log In Before Verifying A Listing', 3000, 'myToast');
//   }
// },
// 'click .verified': function(event,templateInstance) {
//   event.stopPropagation();
//   if (Meteor.user()) {
//     let docId = orderId;
//     let userId = userId;
//     // Meteor.users.update({
//     //   _id: userId
//     // },{
//     //   $addToSet: {"profile.verifiedListings" : docId}
//     // });
//     const updateDoc = {
//       $pull: {
//          verifiers: userId
//       }
//     };
//     Meteor.call('editListing', docId, updateDoc);

//     // Listings.update({
//     //   _id: docId
//     // },{
//     //   $pull: {
//     //      verifiers: userId
//     //   }
//     // });
//   } else {
//     Materialize.toast('Log In Before Verifying A Listing', 3000, 'myToast');
//   }
// },
// 'click .deverified': function(event,templateInstance) {
//   event.stopPropagation();
//   if (Meteor.user()) {
//     let docId = orderId;
//     let userId = userId;
//     // Meteor.users.update({
//     //   _id: userId
//     // },{
//     //   $pull: {"profile.verifiedListings" : docId}
//     // });
//     const updateDoc = {
//       $pull: {
//          deverifiers: userId
//       }
//     }
//     Meteor.call('editListing', docId, updateDoc);
//     // Listings.update({
//     //   _id: docId
//     // },{
//     //   $pull: {
//     //      deverifiers: userId
//     //   }
//     // });
//   }
// }
