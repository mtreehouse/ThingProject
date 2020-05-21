/**
 *======================================================
 * @파일명:BackupComponent.js
 * @작성일자:2020-05-21 오전 10:452
 * @작성자:Yunwoo Kim
 * @설명: React-Bootstrap-table2를 이용한 멤버 백업 테이블 관리
 * @변경이력:
 *===================[ Thing-Project ]===================
 */

import React from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import paginationFactory, { PaginationProvider, PaginationListStandalone } from 'react-bootstrap-table2-paginator';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import { Type } from 'react-bootstrap-table2-editor';
import '../../css/member.css';
import axios from "axios";
import {Checkbox, Button} from "react-bootstrap";

const {Search} = require("react-bootstrap-table2-toolkit");

const delButton = (cell, row) => {
    return (
        <Button
            onClick={()=>{
                if(window.confirm('삭제하시겠습니까?')){
                    axios.head('/api/member/delBackup/'+cell)
                        .then(()=>{
                            window.location.reload();
                        })
                        .catch(e => {alert(e);})
                }
            }}
        >{cell}</Button>
    )
}

const decPhone = (cell) => {
    return (
        <div
            className={'div_phone'}
            onClick={()=>{
                axios.post('/api/admin/dec',{phoneNum:cell})
                    .then(res=>{
                        alert(JSON.stringify(res.data))
                    })
            }}
        >{cell}</div>
    )
}

export default class Member extends React.Component {
    state = {
        products: [],
        columns: [
            {
                dataField: 'id',
                text: 'ID',
                formatter: delButton,
                headerStyle: () => {
                    return { width: '68px', textAlign: 'center' };
                }
            }, {
                dataField: 'my_name',
                text: 'NAME'
            }, {
                dataField: 'my_phone',
                formatter: decPhone,
                text: 'MY ☎',
                rowClasses: 'column-phone'
            }, {
                dataField: 'his_name',
                text: 'LOVER',
                rowClasses: 'column-phone'
            }, {
                dataField: 'his_phone',
                formatter: decPhone,
                text: 'LOVERS ☎'
            }, {
                dataField: 'created_date',
                text: 'DATE'
            }
        ]
    }

    componentDidMount() {
        axios.get('/api/admin/backuplist')
            .then(res => {
                this.setState({
                    products: res.data.members
                })
            })
            .catch(e => {console.log(e);})
    }

    render() {
        const { SearchBar } = Search;
        const options = {
            custom: true,
            sizePerPage: 8,
            paginationSize: 10,
            pageStartIndex: 1,
            firstPageText: '<<',
            prePageText: '◀',
            nextPageText: '▶',
            lastPageText: '>>',
            nextPageTitle: 'First page',
            prePageTitle: 'Pre page',
            firstPageTitle: 'Next page',
            lastPageTitle: 'Last page',
            showTotal: true,
            totalSize: 5
        };
        const contentTable = ({ paginationProps, paginationTableProps }) => (
            <div>
                <ToolkitProvider
                    keyField="id"
                    columns={ this.state.columns }
                    data={ this.state.products }
                    search
                >
                    {
                        toolkitprops => (
                            <div>
                                <SearchBar { ...toolkitprops.searchProps } />
                                <BootstrapTable
                                    bordered
                                    hover
                                    { ...toolkitprops.baseProps }
                                    { ...paginationTableProps }
                                />
                            </div>
                        )
                    }
                </ToolkitProvider>
                <PaginationListStandalone { ...paginationProps } />
            </div>
        );

        return (
            <div className='member'>
                <PaginationProvider
                    pagination={
                        paginationFactory(options)
                    }
                >
                    { contentTable }
                </PaginationProvider>

            </div >
        );
    }
}