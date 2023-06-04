import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Home from '../../pages/Home';
import Profil from '../../pages/Profil';
import Welcome from '../../pages/Welcome';
import Layout from '../../layouts/Layout';
import IndexLayout from '../../layouts/IndexLayout';
import ChoiceLayout from '../../layouts/ChoiceLayout';
import ChoiceMovies from '../log/ChoiceMovies';
import Informations from '../../pages/profil/Informations';
import ChoiceSeries from '../log/ChoiceSeries';
import FollowedMedias from '../../pages/profil/FollowedMedias';
import MediaDetails from '../../pages/MediaDetails';
import NotFound from '../../pages/NotFound';
import AllMedias from '../../pages/AllMedias';

const index = () => {
    return (
        <HashRouter>
            <Routes>
                <Route element={<IndexLayout />}>
                    <Route index element={<Welcome />} />
                </Route>
                <Route element={<ChoiceLayout />}>
                    <Route path="/choix-des-films" element={<ChoiceMovies />} />
                    <Route path="/choix-des-series" element={<ChoiceSeries />} />
                </Route>
                <Route element={<Layout />}>
                    <Route path="/accueil" element={<Home />} />
                    <Route path="/films" element={<AllMedias mediaType={'movie'} />} />
                    <Route path="/film/:id" element={<MediaDetails mediaType={'movie'} />} />
                    <Route path="/series" element={<AllMedias mediaType={'serie'} />} />
                    <Route path="/serie/:id" element={<MediaDetails mediaType={'serie'} />} />
                    <Route path="*" element={<NotFound />} />
                    <Route path="/profil">
                        <Route index element={<Profil />} />
                        <Route path="informations" element={<Informations />} />
                        <Route path="mes-films" element={<FollowedMedias mediaType={'movie'} />} id={'films'} />
                        <Route path="mes-series" element={<FollowedMedias mediaType={'serie'} />} />
                    </Route>
                </Route>
            </Routes>
        </HashRouter>
    );
};

export default index;