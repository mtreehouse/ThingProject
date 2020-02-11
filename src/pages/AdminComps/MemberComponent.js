/**
 *======================================================
 * @파일명:MemberComponent.js
 * @작성일자:2020-02-07 오후 4:40
 * @작성자:Yunwoo Kim
 * @설명: React-Bootstrap-table2를 이용한 멤버 테이블 관리
 * @변경이력: 20200210 오후 02:15 : axios & css 적용
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
import Checkbox from "react-bootstrap/lib/Checkbox";

const {Search} = require("react-bootstrap-table2-toolkit");

export default class Member extends React.Component {
    state = {
        products: [],
        columns: [
            {
                dataField: 'id',
                text: 'ID',
                headerStyle: () => {
                    return { width: '10%', textAlign: 'center' };
                }
            }, {
                dataField: 'name',
                text: 'NAME'
            }, {
                dataField: 'myphone',
                text: 'MY-PHONE'
            }, {
                dataField: 'hisphone',
                text: 'HIS-PHONE'
            }, {
                dataField: 'date',
                text: 'DATE'
            }, {
                dataField: 'checked',
                text: 'CHECKED',
                formatter: (cell) => <Checkbox checked={cell} />,
                editor: {
                    type: Type.CHECKBOX
                }
            }
        ]
    }

    componentDidMount() {
        axios.get('/api/admin/list')
            .then(res => {
                this.setState({
                    products: [{
                        id: 2,
                        name: 'kim',
                        myphone: '+821037373737',
                        hisphone: '+821039487283',
                        date: '2020-02-11',
                        checked: 1
                    }] //res.data.member
                })
            })
            .catch(e => {console.log(e);})
    }

    render() {
        const { SearchBar } = Search;
        const options = {
            custom: true,
            paginationSize: 4,
            pageStartIndex: 1,
            firstPageText: 'First',
            prePageText: 'Back',
            nextPageText: 'Next',
            lastPageText: 'Last',
            nextPageTitle: 'First page',
            prePageTitle: 'Pre page',
            firstPageTitle: 'Next page',
            lastPageTitle: 'Last page',
            showTotal: true,
            totalSize: 7//this.products.length
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