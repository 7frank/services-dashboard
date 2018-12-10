import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {
    Table,
    Breadcrumb,
    BreadcrumbItem,
} from 'reactstrap';

import s from './PostList.scss';
import withMeta from '../../../core/withMeta';
import Widget from '../../../components/Widget';
import {fetchQueues} from "../../../actions/queues";

import {

    Progress

} from 'reactstrap';


class QueueList extends React.Component {
    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        queues: PropTypes.array, // eslint-disable-line
        isFetching: PropTypes.bool,
        message: PropTypes.string
    };

    static defaultProps = {
        isFetching: false,
        queues: null,
        message: null
    };

    static meta = {
        title: 'Queue list',
        description: 'About description',
    };

    componentWillMount() {
        this.props.dispatch(fetchQueues());
    }

    render() {
        return (
            <div className={s.root}>
                <Widget
                    className="pb-0"
                    title={
                        <div>
                            <div className="pull-right mt-n-xs">
                                <Link to="/app/posts/new" className="btn btn-sm btn-inverse">
                                    Create new
                                </Link>
                            </div>
                            <h5 className="mt-0">

                                {!this.props.message && (
                                    <span>Queues<span className="fw-semi-bold">List</span></span>
                                )}

                                {this.props.message && (
                                    <span className="text-danger">{this.props.message}</span>
                                )}

                            </h5>
                        </div>
                    }
                >
                    <div className="widget-table-overflow">
                        {this.props.queues && (

                            <Table striped>
                                <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Progress</th>
                                    <th>Last Updated</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    this.props.queues.map(queue => (
                                        <tr key={queue.id}>
                                            <td>{queue.name}</td>
                                            <td>
                                                <Progress className="progress-sm" color="success" value={queue.progress*100}>{Math.round(queue.progress*100)}</Progress>
                                            </td>
                                        </tr>
                                    ))}
                                {this.props.queues &&
                                !this.props.queues.length && (
                                    <tr>
                                        <td colSpan="100">No posts yet</td>
                                    </tr>
                                )}
                                {this.props.isFetching && (
                                    <tr>
                                        <td colSpan="100">Loading...</td>
                                    </tr>
                                )}
                                </tbody>
                            </Table>)}
                    </div>
                </Widget>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        isFetching: state.queues.isFetching,
        queues: state.queues.queues,
        message: state.queues.message
    };
}

export default connect(mapStateToProps)(withStyles(s)(withMeta(QueueList)));