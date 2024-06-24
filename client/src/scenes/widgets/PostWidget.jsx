import React from 'react'
import {
    ChatBubbleOutlineOutlined,
    FavoriteBorderOutlined,
    FavoriteOutlined,
    ShareOutlined,
    AddCommentOutlined
} from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme, InputBase } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Friend from 'components/Friend';
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "state";
import { baseUrl } from 'baseUrl';


function PostWidget({

    postId,
    postUserId,
    name,
    description,
    location,
    picturePath,
    userPicturePath,
    likes,
    comments
}) {
    const [isComments, setIsComments] = useState(false)
    const [comment_, setComment_] = useState(" ")
    const dispatch = useDispatch()
    const token = useSelector((state) => state.token)
    const loggedInUserId = useSelector((state) => state.user._id)
    const isLiked = Boolean(likes[loggedInUserId])
    const likeCount = Object.keys(likes).length

    const { palette } = useTheme()
    const main = palette.neutral.main;
    const primary = palette.primary;

    const patchLike = async () => {
        const response = await fetch(`${baseUrl}/posts/${postId}/like`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId: loggedInUserId }),
        });
        const updatedPost = await response.json();
        dispatch(setPost({ post: updatedPost }));
    };
    const addComment = async () => {
        const response = await fetch(`${baseUrl}/posts/${postId}/addComment`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ comment: comment_ }),
        });
        const updatedPost = await response.json();
        dispatch(setPost({ post: updatedPost }));
    }

    return (
        <WidgetWrapper m="2rem 0">
            <Friend
                friendId={postUserId}
                name={name}
                subtitle={location}
                userPicturePath={userPicturePath}
            />
            <Typography color={main} sx={{ mt: "1rem" }}>
                {description}
            </Typography>
            {picturePath && (
                <img
                    width="100%"
                    height="auto"
                    alt="post"
                    style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
                    src={`${baseUrl}/assets/${picturePath}`}
                />
            )}
            <FlexBetween mt="0.25rem">
                <FlexBetween gap="1rem">
                    <FlexBetween gap="0.3rem">
                        <IconButton onClick={patchLike}>
                            {isLiked ? (
                                <FavoriteOutlined sx={{ color: primary }} />
                            ) : (
                                <FavoriteBorderOutlined />
                            )}
                        </IconButton>
                        <Typography>{likeCount}</Typography>
                    </FlexBetween>

                    <FlexBetween gap="0.3rem">
                        <IconButton onClick={() => setIsComments(!isComments)}>
                            <ChatBubbleOutlineOutlined />
                        </IconButton>
                        <Typography>{comments.length}</Typography>
                    </FlexBetween>
                </FlexBetween>

                <IconButton>
                    <ShareOutlined />
                </IconButton>
            </FlexBetween>
            {isComments && (
                <Box display='flex' flexDirection='column' gap='1rem'>

                    <FlexBetween gap='1.5rem' m='1.5rem'>
                        <InputBase
                            placeholder="say something..."
                            onChange={(e) => setComment_(e.target.value)}
                            value={comment_}
                            sx={{
                                width: "100%",
                                backgroundColor:palette.neutral.light,
                                borderRadius: "2rem",
                                padding: "1rem 2rem",
                            }}
                        />
                        <IconButton onClick={addComment}>
                            <AddCommentOutlined fontSize='large' />
                        </IconButton>
                    </FlexBetween>

                    <Box >
                        {comments.map((comment, i) => (
                            <Box key={`${name}-${i}`}>
                                <Divider />
                                <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                                    {comment}
                                </Typography>
                            </Box>
                        ))}
                        <Divider />
                    </Box>
                </Box>
            )}
        </WidgetWrapper>
    )
}

export default PostWidget
