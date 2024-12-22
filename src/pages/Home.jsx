import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom'; // Добавим для использования useParams, если нужно
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';

import {Post} from '../components/Post';
import {TagsBlock} from '../components/TagsBlock';
import {CommentsBlock} from '../components/CommentsBlock';
import {fetchPosts, fetchTags} from "../redux/slices/posts";

export const Home = () => {

    // const {currentUrl} = useParams(); // Если currentUrl не используется, можно удалить

    const dispatch = useDispatch();
    const {posts, tags} = useSelector(state => state.posts);
    const userData = useSelector((state) => state.auth.data);
    const arePostsLoading = posts.status === 'loading'; // Исправил название переменной на arePostsLoading
    const areTagsLoading = tags.status === 'loading';
  
    const [activeTab, setActiveTab] = useState(0);

    // Функция для обработки изменения вкладки
    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    useEffect(() => {
        dispatch(fetchPosts());
        dispatch(fetchTags());
    }, [dispatch]);

    // Фильтрация постов в зависимости от выбранной вкладки
    const filteredPosts = activeTab === 0 ? posts.items : posts.items.filter(post => post.isPopular);

    console.log(posts);

    return (
        <>
            <Tabs 
                style={{marginBottom: 15}} 
                value={activeTab} 
                onChange={handleTabChange} 
                aria-label="basic tabs example"
            >
                <Tab label="Новые" />
                <Tab label="Популярные" />
            </Tabs>
            <Grid container spacing={4}>
                <Grid item xs={8}>
                    {(arePostsLoading ? [...Array(5)] : filteredPosts).map((obj, index) =>
                        arePostsLoading ? (
                            <Post key={index} isLoading={true} />
                        ) : (
                            <Post
                                key={obj._id}
                                _id={obj._id}
                                title={obj.title}
                                imageUrl={obj.imageUrl}
                                user={obj.user}
                                createdAt={obj.createdAt}
                                viewsCount={obj.viewsCount}
                                commentsCount={3}
                                tags={obj.tags}
                                isEditable={userData?._id === obj.user._id}
                            />
                        ))}
                </Grid>
                <Grid item xs={4}>
                    <TagsBlock items={tags.items} isLoading={areTagsLoading} />
                    <CommentsBlock
                        items={[
                            {
                                user: {
                                    fullName: 'Вася Пупкин',
                                    avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
                                },
                                text: 'Это тестовый комментарий',
                            },
                            {
                                user: {
                                    fullName: 'Иван Иванов',
                                    avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
                                },
                                text: 'When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top',
                            },
                        ]}
                        isLoading={false}
                    />
                </Grid>
            </Grid>
        </>
    );
};
