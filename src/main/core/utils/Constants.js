(function() {
    'use strict';
    var constantsModule = angular.module('konst', []);
    constantsModule.factory('enums', function() {
        var enums = {

            ACTION_CREATE:'create',
            ACTION_EDIT:'edit',
            ACTION_DELETE:'delete',
            ACTION_READ:'read',

            NOTE_RESOURCE_TYPE_STYLE: 'STYLE',
            NOTE_RESOURCE_TYPE_ASSORTMENT: 'ASSORTMENT',
            NOTE_MAX_TEXT_LENGTH: 256,
            ORDER_NAME_MAX_LENGTH: 60,
            MAX_ASSORTMENT_SORTORDER_NUMBER: 998,
            MAX_NUMBER_CRDS: 15,
            CALENDAR_ADD: 'add',
            CALENDAR_DELETE: 'delete',
            CALENDAR_DONE: 'done',
            CALENDAR_EDIT: 'edit',
            FTWR_ENUM: 'FTWR',
            APRL_ENUM: 'APRL',
            EQMT_ENUM: 'EQMT',
            PRODUCTS_ENUM: 'products',
            UNITS_ENUM: 'units',
            WHOLESALE_ENUM: 'wholesale',
            RETAIL_ENUM: 'retail',
            PROPERTY_EXPIRATION_DAYS: 90,

            REVIEW_TOTALS_DELAY_MS: 1000,
            HELP_OVERLAY_COOKIE_NAME: '__helpoverlay',
            HELP_OVERLAY_COOKIE_VERSION: '1.1',
            FUTURES: 'FUTURES',
            FUTURES_CONTRACT: 'FUTURES_CONTRACT',
            PERCENT_COMPLETE: 100,
            WORKSPACE_STATUS_PENDING: 'PENDING_REP_REVIEW',
            WORKSPACE_STATUS_SUBMITTED: 'SUBMITTED',
            WORKSPACE_STATUS_SAVED: 'SAVED',
            WORKSPACE_STATUS_JUST_PLACED: 'JUST_PLACED',
            WORKSPACE_STATUS_BG_PROCESSING: 'PENDING_BG_REP_REVIEW_PROCESSING',
            CRD: 'crd',
            ASSORTMENT: 'assortment',
            TYPE: 'type',
            GENDER: 'gender',
            CATEGORY: 'category',
            SILHOUETTE: 'silhouette',
            GENDERS: [
                'MENS',
                'WOMENS',
                'KIDS',
                'UNISEX'
            ],
            PRODUCT_COLORS: [
                'BLACK_OR_GREY',
                'BLUE',
                'BROWN',
                'GREEN',
                'ORANGE',
                'PURPLE',
                'RED',
                'WHITE',
                'YELLOW',
                'MULTI'
            ],
            PRODUCT_COLOR_CODES: {
                'BLACK_OR_GREY': '0',
                'BLUE': '4',
                'BROWN': '2',
                'GREEN': '3',
                'ORANGE': '8',
                'PURPLE': '5',
                'RED': '6',
                'WHITE': '1',
                'YELLOW': '7',
                'MULTI': '9'
            },
            PRODUCT_TYPES: [
                'FTWR',
                'APRL',
                'EQMT'
            ],
            BODYTYPEGROUPS: [
                'BAG',
                'BALL',
                'BAT',
                'BOTTOM',
                'EYEWEAR',
                'GLOVE',
                'HEADWEAR',
                'HIGH_TOP',
                'KIT',
                'LOW_TOP',
                'ONE_PIECE_SUIT',
                'OTHER',
                'PROTECTIVE_GEAR',
                'SET_WARMUP',
                'SOCK',
                'THREE_QUARTER_HIGH',
                'TOP'
            ],
            CATEGORIES: [
                'ACTION_SPORTS',
                'AMERICAN_FOOTBALL',
                'BASEBALL_FIELD_SPORTS',
                'BASKETBALL',
                'FOOTBALL_SOCCER',
                'GOLF',
                'GRADE_SCHOOL',
                'JORDAN',
                'MENS_TRAINING',
                'MULTI_SIZE',
                'ONE_SIZE',
                'OTHER',
                'OUTDOOR',
                'RUNNING',
                'SPORTSWEAR',
                'TENNIS',
                'TODDLER',
                'WOMENS_TRAINING',
                'YOUNG_ATHLETES'
            ]
        };

        if (Object.hasOwnProperty('freeze')) {
            Object.freeze(enums);
        }

        return enums;
    });
}());