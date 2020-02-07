import React from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider, PaginationListStandalone } from 'react-bootstrap-table2-paginator';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import {Get} from 'react-axios'

const {Search} = require("react-bootstrap-table2-toolkit");

function productsGenerator(number) {
    const columns = [{
        dataField: 'id',
        text: 'Product ID'
    }, {
        dataField: 'name',
        text: 'Product Name'
    }, {
        dataField: 'price',
        text: 'Product Price'
    }];

    return columns;
}

function columnsGenerator() {
    const columns = [{
        dataField: 'id',
        text: 'Product ID'
    }, {
        dataField: 'name',
        text: 'Product Name'
    }, {
        dataField: 'price',
        text: 'Product Price'
    }];

    return columns
}

export default class Member extends React.Component {
    //state = { products }

    loadData = () => {
        this.setState({ products: productsGenerator(17) });
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
            totalSize: 17
        };
        const contentTable = ({ paginationProps, paginationTableProps }) => (
            <div>
                <button className="btn btn-default" onClick={ this.loadData }>Load Another Data</button>
                <PaginationListStandalone { ...paginationProps } />
                <ToolkitProvider
                    keyField="id"
                    columns={ columnsGenerator() }
                    data={ [{
                        dataField: 'id',
                        text: 'Product ID'
                    }, {
                        dataField: 'name',
                        text: 'Product Name'
                    }, {
                        dataField: 'price',
                        text: 'Product Price'
                    }] }
                    search
                >
                    {
                        toolkitprops => (
                            <div>
                                <SearchBar { ...toolkitprops.searchProps } />
                                <BootstrapTable
                                    striped
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
            <div>
                <h2>PaginationProvider will care the data size change. You dont do anything</h2>
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



// import React from "react";
// import {Get} from 'react-axios'
// import { Table } from  'react-bootstrap'
// import 'bootstrap/dist/css/bootstrap.min.css';
//
// export default class Member extends React.Component {
//     render() {
//         return (
//             <div>
//                 <div>
//                     <Table bordered hover>
//                         <thead>
//                         <tr>
//                             <th>id</th>
//                             <th>name</th>
//                             <th>title</th>
//                             <th>date</th>
//                         </tr>
//                         </thead>
//                         <tbody>
//                         <Get url="/api/admin/list">
//                             {(error, response, isLoading, makeRequest, axios) => {
//                                 if (error) {
//                                     return (<div>Something bad happened: {error.message}
//                                         <button onClick={() => makeRequest({params: {reload: true}})}>Retry</button>
//                                     </div>)
//                                 } else if (response !== null) {
//                                     console.log("_________________" + JSON.stringify(response));
//                                     return (
//                                         response.data.member.map(member => {
//                                             return (
//                                                 <tr>
//                                                     <td>{member.id}</td>
//                                                     <td>{member.author}</td>
//                                                     <td>{member.title}</td>
//                                                     <td>{member.created_date}</td>
//                                                 </tr>
//                                             )
//                                         })
//                                     )
//                                 }
//                                 return (
//                                     <div>Default message before request is made.</div>
//                                 )
//                             }}
//                         </Get>
//                         </tbody>
//                     </Table>
//                 </div>
//             </div>
//         )
//     }
//
// };