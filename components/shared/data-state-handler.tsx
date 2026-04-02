'use client';

import { ReactNode } from 'react';
import { ListPageLoader, ListPageLoaderProps } from './loader/list-page-loader';
import { DetailPageLoader, DetailPageLoaderProps } from './loader/detail-page-loader';
import { FetchingError, FetchingErrorProps } from './error/fetching-error';

interface DataStateHandlerProps {
    /** Whether data is currently loading */
    isLoading?: boolean;
    /** Error object if data fetch failed */
    error?: any;
    /** The actual data to render */
    children?: ReactNode;
    /** Loader type: 'list' or 'detail' (default: 'list') */
    loaderType?: 'list' | 'detail';
    /** Props to pass to ListPageLoader */
    listLoaderProps?: Partial<ListPageLoaderProps>;
    /** Props to pass to DetailPageLoader */
    detailLoaderProps?: Partial<DetailPageLoaderProps>;
    /** Props to pass to FetchingError */
    errorProps?: Partial<FetchingErrorProps>;
    /** Callback to retry fetching data */
    onRetry?: () => void;
    /** Custom loading component to use instead of default loaders */
    customLoader?: ReactNode;
    /** Custom error component to use instead of default error */
    customError?: ReactNode;
}

export function DataStateHandler({
    isLoading = false,
    error,
    children,
    loaderType = 'list',
    listLoaderProps = {},
    detailLoaderProps = {},
    errorProps = {},
    onRetry,
    customLoader,
    customError,
}: DataStateHandlerProps) {
    // Handle loading state
    if (isLoading) {
        if (customLoader) {
            return customLoader;
        }

        if (loaderType === 'detail') {
            return <DetailPageLoader {...detailLoaderProps} />;
        }

        return <ListPageLoader {...listLoaderProps} />;
    }

    // Handle error state
    if (error) {
        if (customError) {
            return customError;
        }

        return (
            <FetchingError
                error={error}
                refetch={onRetry}
                {...errorProps}
            />
        );
    }

    // Render children when data is ready
    return children;
}
