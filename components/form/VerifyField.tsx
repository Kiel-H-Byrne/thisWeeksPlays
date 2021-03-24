import { ArrowDownIcon, ArrowUpIcon } from "@chakra-ui/icons";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { useField } from "formik";
import React from "react";

interface Props {
  orderId: string;
  userId: string;
  upVotes: string[];
  downVotes: string[];
}

const VerifyField = ({ orderId, userId, upVotes, downVotes }: Props) => {
  // const [field, meta, helpers] = useField("verify");
  // field.onChange = (e) => {
  // getSymbolSet(e.target.value);
  // helpers.setValue(e.target.value);
  // };

  // const setInputValue = (symbol) => {
  // helpers.setValue(symbol);
  // setResults([]);
  // };

  const in_upvoted = () => {
    //if verifiedListings array contains order id, return true.
    if (userId && upVotes.length > 0) {
      return upVotes.includes(userId);
    } else {
      return false;
    }
  };
  const in_downvoted = () => {
    //if verifiedListings array contains order id, return true.
    if (userId && downVotes.length > 0) {
      return downVotes.includes(userId);
    } else {
      return false;
    }
  };
  const upVoteCount = () => {
    return upVotes.length;
  };

  return (
    <FormControl id="verify-control">
      <div className="voteButton">
        <span className="upVote">
          <ArrowDownIcon className={in_upvoted() ? `verified` : `verify`} />
        </span>
        <span className="vote-count">{upVoteCount() } Verified</span>
        <span className="downVote">
          <ArrowUpIcon className={in_downvoted() ? `deverified` : `deverify`} />
        </span>
      </div>
      {/* <FormErrorMessage>{meta.error}</FormErrorMessage> */}
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
