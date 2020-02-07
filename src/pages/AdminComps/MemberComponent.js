import React from "react";
import {Get} from 'react-axios'
import { Table } from  'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

export default class Member extends React.Component {
    render() {
        return (
            <div>
                <div>
                    <Table bordered hover>
                        <thead>
                        <tr>
                            <th>id</th>
                            <th>name</th>
                            <th>title</th>
                            <th>date</th>
                        </tr>
                        </thead>
                        <tbody>
                        <Get url="/api/admin/list">
                            {(error, response, isLoading, makeRequest, axios) => {
                                if (error) {
                                    return (<div>Something bad happened: {error.message}
                                        <button onClick={() => makeRequest({params: {reload: true}})}>Retry</button>
                                    </div>)
                                } else if (response !== null) {
                                    console.log("_________________" + JSON.stringify(response));
                                    return (
                                        response.data.member.map(member => {
                                            return (
                                                <tr>
                                                    <td>{member.id}</td>
                                                    <td>{member.author}</td>
                                                    <td>{member.title}</td>
                                                    <td>{member.created_date}</td>
                                                </tr>
                                            )
                                        })
                                    )
                                }
                                return (
                                    <div>Default message before request is made.</div>
                                )
                            }}
                        </Get>
                        </tbody>
                    </Table>
                </div>
            </div>
        )
    }

};