import React, {Component} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faComment, faHeart} from "@fortawesome/free-regular-svg-icons";
import {faRetweet, faShareSquare} from "@fortawesome/free-solid-svg-icons";
import {Modal} from "react-bootstrap";
import CreateTweet from "./CreateTweet";

class TweetButtons extends Component {
    constructor(props) {
        super(props);
        this.state = {
            retweetIncrement: 0,
            likeIncrement: 0,
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
        console.log("render TweetButtons");
        console.log(this.state.props);

        return (
            <div>
                <div style={styles.container}>
                    <button
                        type="button"
                        className="list-group-item list-group-item-action borderless"
                        style={styles.reply}
                        onClick={this.openCommentModal}
                    >
                        <FontAwesomeIcon icon={faComment} />
                    </button>
                    <button
                        type="button"
                        className="list-group-item list-group-item-action borderless"
                        style={styles.retweet}
                        onClick={() => {
                            this.props.retweetTweetCallback(this.props.data.tweetId, this.props.data.userId)
                            this.setState({retweetIncrement: 1})
                        }}
                    >
                        <FontAwesomeIcon icon={faRetweet} />
                        {this.props.data.retweetCount + this.state.retweetIncrement}
                    </button>
                    <button
                        type="button"
                        className="list-group-item list-group-item-action borderless"
                        style={styles.like}
                        onClick={() => {
                            this.props.likeTweetCallback(this.props.data.tweetData, this.props.data.owner,
                                this.props.data.retweetingUserId, this.props.data.tweetId)
                            this.setState({likeIncrement: 1})
                        }}
                    >
                        <FontAwesomeIcon icon={faHeart} />
                        {this.props.data.likes + this.state.likeIncrement}
                    </button>
                    <button
                        type="button"
                        className="list-group-item list-group-item-action borderless"
                        style={styles.share}
                    >
                        <FontAwesomeIcon icon={faShareSquare} />
                    </button>
                </div>

                <Modal
                    show={this.state.isOpenCommentModal}
                    onHide={this.closeCommentModal}
                    animation={false}
                >
                    <CreateTweet />
                </Modal>
            </div>
        )
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

export default TweetButtons;