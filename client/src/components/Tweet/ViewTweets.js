import React, { Component } from 'react';
import { Button, Form, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faRetweet, faShareSquare } from "@fortawesome/free-solid-svg-icons";
import { PullDownContent, PullToRefresh, RefreshContent, ReleaseContent } from "react-js-pull-to-refresh";
import TweetBody from "../HomeTweetList/listview";
import TweetButtons from "../Tweet/TweetButtons";
import { faComment, faHeart } from "@fortawesome/free-regular-svg-icons";
import CreateTweet from "./CreateTweet";

class ViewTweets extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            isOpenCommentModal: false
        };
    }

    openCommentModal = e => {
        this.setState({ isOpenCommentModal: true });
    };

    closeCommentModal = e => {
        this.setState({ isOpenCommentModal: false });
    };

    render() {
        console.log("render HomeTweetList");
        return (
            <PullToRefresh
                pullDownContent={<PullDownContent />}
                releaseContent={<ReleaseContent />}
                refreshContent={<RefreshContent />}
                pullDownThreshold={2}
                triggerHeight={50}>
                <div className="main-body">
                    {console.log("this.props.dataFromParent123", this.props.dataFromParent)}
                    {this.props.dataFromParent.map((tweet, index) => {
                        console.log("tweet" + index)
                        console.log(tweet)
                        let name = tweet.owner !== undefined ? `${tweet.owner.firstName} ${tweet.owner.lastName}` : "";
                        let handle = `@${tweet.owner.username}`;
                        let image = tweet.image;
                        let tweetText = tweet.data.text;
                        console.log(image);

                        const buttonData = {};
                        buttonData.tweetId = tweet.tweetId;
                        buttonData.userId = tweet.userId;
                        buttonData.retweetCount = tweet.retweetCount;
                        buttonData.likes = tweet.likes;
                        buttonData.tweetData = tweet.data;

                        const owner = {};
                        owner["firstName"] = localStorage.getItem("firstName");
                        owner["lastName"] = localStorage.getItem("lastName");
                        owner["username"] = localStorage.getItem("username");
                        owner["image"] = "";

                        buttonData.owner = tweet.owner;
                        buttonData.retweetingUserId = localStorage.getItem("id");

                        return (
                            <div>
                                <TweetBody
                                    key={index}
                                    name={name}
                                    handle={handle}
                                    tweet={tweetText}
                                    image={image}
                                />

                                <TweetButtons data={buttonData} likeTweetCallback={this.props.likeTweetCallback} retweetTweetCallback={this.props.retweetTweetCallback}/>

                                {/*<div style={styles.container}>*/}
                                {/*    <button*/}
                                {/*        type="button"*/}
                                {/*        className="list-group-item list-group-item-action borderless"*/}
                                {/*        style={styles.reply}*/}
                                {/*        onClick={this.openCommentModal}*/}
                                {/*    >*/}
                                {/*        <FontAwesomeIcon icon={faComment} />*/}
                                {/*    </button>*/}
                                {/*    <button*/}
                                {/*        type="button"*/}
                                {/*        className="list-group-item list-group-item-action borderless"*/}
                                {/*        style={styles.retweet}*/}
                                {/*        onClick={() => {*/}
                                {/*            this.props.retweetTweetCallback(tweet.tweetId, tweet.userId)*/}
                                {/*        }}*/}
                                {/*    >*/}
                                {/*        <FontAwesomeIcon icon={faRetweet} />*/}
                                {/*        {tweet.retweetCount}*/}
                                {/*    </button>*/}
                                {/*            <button*/}
                                {/*                type="button"*/}
                                {/*                className="list-group-item list-group-item-action borderless"*/}
                                {/*                style={styles.like}*/}
                                {/*                onClick={() => {*/}
                                {/*                    this.props.likeTweetCallback(tweet.tweetId, tweet.userId)*/}
                                {/*                    likeIncrement = likeIncrement + 1;*/}
                                {/*                }}*/}
                                {/*            >*/}
                                {/*                <FontAwesomeIcon icon={faHeart} />*/}
                                {/*                {tweet.likes + likeIncrement}*/}
                                {/*            </button>*/}
                                {/*    <button*/}
                                {/*        type="button"*/}
                                {/*        className="list-group-item list-group-item-action borderless"*/}
                                {/*        style={styles.share}*/}
                                {/*    >*/}
                                {/*        <FontAwesomeIcon icon={faShareSquare} />*/}
                                {/*    </button>*/}
                                {/*</div>*/}

                                {/*<Modal*/}
                                {/*    show={this.state.isOpenCommentModal}*/}
                                {/*    onHide={this.closeCommentModal}*/}
                                {/*    animation={false}*/}
                                {/*>*/}
                                {/*    <CreateTweet />*/}
                                {/*</Modal>*/}
                            </div>
                        )
                    })}
                </div>
            </PullToRefresh>
        );
    }
}

const styles = {
    container: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        "margin-left": 65,
        "margin-right": 10
    },
    reply: {
        //alignItems: "left",
    },
    retweet: {
        //alignItems: "center",
    },
    like: {
        //alignItems: "center",
    },
    share: {
        //alignItems: "right",
    }
};

export default ViewTweets;