import React,{Component} from 'react';
import { Button, Grid, TextField} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import styled from 'styled-components';

import * as api from '../../services/api';

const WeatherBlock = styled.div`
    display: block;
    width: 100%;
    min-height: 150px;
    text-align: center;
    font-size: 20px;
    color: #ffffff;
    background: #468ab5; /* Old browsers */
    background: -moz-linear-gradient(-45deg, #468ab5 0%, #add3cf 100%); /* FF3.6-15 */
    background: -webkit-linear-gradient(-45deg, #468ab5 0%,#add3cf 100%); /* Chrome10-25,Safari5.1-6 */
    background: linear-gradient(135deg, #468ab5 0%,#add3cf 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#468ab5', endColorstr='#add3cf',GradientType=1 ); /* IE6-9 fallback on horizontal gradient */ 
    .header {
        display: block;
        padding: 20px 0;
        border-bottom: 1px solid #ffffff;
    }   
    .temperature {
        font-size: 40px;
        line-height: 130px;
    }
`;
const GridContainer = styled(Grid)`
    display: block;
    padding: 15px 5px 15px 15px;
`;

const CloseIconContainer = styled(CloseIcon)`
    color: #ffffff;
    float: right;
`;

const TextFieldContainer = styled(TextField)`
    display: block;
    margin: 0 20px !important;
`;

export default class WeatherWidget extends Component {

    constructor(props) {
        super(props);
        this.state = {
            location: '',
            locationError: false,
            locationList: []
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleCloseBlock = this.handleCloseBlock.bind(this);
        this.handleAddBlock = this.handleAddBlock.bind(this);
    }

    componentWillMount() {
        api.getInitData().then(response => {
            this.setState({
                locationList: response
            });
        });
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    handleCloseBlock = (id) => {
        const locationListState = this.state.locationList;
        const locationList = api.removeLocationFromStorage(id, locationListState);

        this.setState({
            locationList: locationList
        })
    };

    handleAddBlock = () => {

        const locations = this.state.locationList;
        const name = this.state.location.split(',');
        api.addLocation(name[0]).then( res => {
            if(!res.cod) {
                locations.push(res);
                this.setState({
                    locationList: locations,
                    locationError: false
                });
            } else {
                this.setState({
                    locationError: true
                });
            }
        });
    }

    render() {
        const weatherWidget = this.state.locationList.map(elem => {
            return (
                <GridContainer item md={2} key={elem.id}>
                    <WeatherBlock>
                        <CloseIconContainer onClick={() => {this.handleCloseBlock(elem.id)}}/>
                        <div className="header">{elem.name}</div>
                        <div className="temperature">{elem.temperature.temp} &#8451;</div>
                    </WeatherBlock>
                </GridContainer>
            )
        });

        return (
            <div>
                <Grid container spacing={0}>
                    <Grid item md={12} >
                        <TextFieldContainer
                            error={this.state.locationError}
                            id="location"
                            label="Location"
                            value={this.state.location}
                            onChange={this.handleChange('location')}
                        />
                        <Button variant="raised" color="primary" onClick={this.handleAddBlock}>
                            Add location
                        </Button>
                    </Grid>
                </Grid>
                <Grid container spacing={0}>
                    { weatherWidget }
                </Grid>
            </div>
        );
    }
}