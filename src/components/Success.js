import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import styled from 'styled-components';

export default function Success() {
    const params = useParams();

    console.log(params);

    return (
        <h1>OK</h1>


    );
}