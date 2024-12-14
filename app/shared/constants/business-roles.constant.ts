export enum AvailableBusinessRoles {
    BUSINESS_USER = 'MEMBER',
    BUSINESS_ADMIN = 'ADMIN',
    BUSINESS_OWNER = 'OWNER'
};

export const BusinessRoleBasedActions = {
    /** OFFER ACTIONS */
    OFFER_CREATE_ITEM: [ AvailableBusinessRoles.BUSINESS_ADMIN, AvailableBusinessRoles.BUSINESS_OWNER, AvailableBusinessRoles.BUSINESS_USER ],
    OFFER_CREATE_SERVICE: [ AvailableBusinessRoles.BUSINESS_ADMIN, AvailableBusinessRoles.BUSINESS_OWNER, AvailableBusinessRoles.BUSINESS_USER ],
    OFFER_CREATE_DRAFT: [ AvailableBusinessRoles.BUSINESS_ADMIN, AvailableBusinessRoles.BUSINESS_OWNER, AvailableBusinessRoles.BUSINESS_USER ],

    OFFER_EDIT_ITEM: [ AvailableBusinessRoles.BUSINESS_ADMIN, AvailableBusinessRoles.BUSINESS_OWNER, AvailableBusinessRoles.BUSINESS_USER ],
    OFFER_EDIT_SERVICE: [ AvailableBusinessRoles.BUSINESS_ADMIN, AvailableBusinessRoles.BUSINESS_OWNER, AvailableBusinessRoles.BUSINESS_USER ],
    OFFER_EDIT_DRAFT: [ AvailableBusinessRoles.BUSINESS_ADMIN, AvailableBusinessRoles.BUSINESS_OWNER, AvailableBusinessRoles.BUSINESS_USER ],

    OFFER_ADD_FAVORITE: [ AvailableBusinessRoles.BUSINESS_ADMIN, AvailableBusinessRoles.BUSINESS_OWNER, AvailableBusinessRoles.BUSINESS_USER ],
    OFFER_REMOVE_FAVORITE: [ AvailableBusinessRoles.BUSINESS_ADMIN, AvailableBusinessRoles.BUSINESS_OWNER, AvailableBusinessRoles.BUSINESS_USER ],

    OFFER_SHARE: [ AvailableBusinessRoles.BUSINESS_ADMIN, AvailableBusinessRoles.BUSINESS_OWNER, AvailableBusinessRoles.BUSINESS_USER ],
    OFFER_OPEN_CHAT: [ AvailableBusinessRoles.BUSINESS_ADMIN, AvailableBusinessRoles.BUSINESS_OWNER, AvailableBusinessRoles.BUSINESS_USER ],

    OFFER_CLONE_ITEM: [ AvailableBusinessRoles.BUSINESS_ADMIN, AvailableBusinessRoles.BUSINESS_OWNER, AvailableBusinessRoles.BUSINESS_USER ],
    OFFER_CLONE_SERVICE: [ AvailableBusinessRoles.BUSINESS_ADMIN, AvailableBusinessRoles.BUSINESS_OWNER, AvailableBusinessRoles.BUSINESS_USER ],

    OFFER_DELETE_ITEM: [ AvailableBusinessRoles.BUSINESS_ADMIN, AvailableBusinessRoles.BUSINESS_OWNER, AvailableBusinessRoles.BUSINESS_USER ],
    OFFER_DELETE_SERVICE: [ AvailableBusinessRoles.BUSINESS_ADMIN, AvailableBusinessRoles.BUSINESS_OWNER, AvailableBusinessRoles.BUSINESS_USER ],

    OFFER_HIDE_ITEM: [ AvailableBusinessRoles.BUSINESS_ADMIN, AvailableBusinessRoles.BUSINESS_OWNER, AvailableBusinessRoles.BUSINESS_USER ],
    OFFER_HIDE_SERVICE: [ AvailableBusinessRoles.BUSINESS_ADMIN, AvailableBusinessRoles.BUSINESS_OWNER, AvailableBusinessRoles.BUSINESS_USER ],
    OFFER_UNHIDE_ITEM: [ AvailableBusinessRoles.BUSINESS_ADMIN, AvailableBusinessRoles.BUSINESS_OWNER, AvailableBusinessRoles.BUSINESS_USER ],
    OFFER_UNHIDE_SERVICE: [ AvailableBusinessRoles.BUSINESS_ADMIN, AvailableBusinessRoles.BUSINESS_OWNER, AvailableBusinessRoles.BUSINESS_USER ],

    OFFER_DELEGATE_ITEM: [ AvailableBusinessRoles.BUSINESS_ADMIN, AvailableBusinessRoles.BUSINESS_OWNER ],
    OFFER_DELEGATE_SERVICE: [ AvailableBusinessRoles.BUSINESS_ADMIN, AvailableBusinessRoles.BUSINESS_OWNER ],

    OFFER_COMMENT_ITEM: [ AvailableBusinessRoles.BUSINESS_ADMIN, AvailableBusinessRoles.BUSINESS_OWNER, AvailableBusinessRoles.BUSINESS_USER ],
    OFFER_COMMENT_SERVICE: [ AvailableBusinessRoles.BUSINESS_ADMIN, AvailableBusinessRoles.BUSINESS_OWNER, AvailableBusinessRoles.BUSINESS_USER ],
    OFFER_COMMENT_REPLY_ITEM: [ AvailableBusinessRoles.BUSINESS_ADMIN, AvailableBusinessRoles.BUSINESS_OWNER, AvailableBusinessRoles.BUSINESS_USER ],
    OFFER_COMMENT_REPLY_SERVICE: [ AvailableBusinessRoles.BUSINESS_ADMIN, AvailableBusinessRoles.BUSINESS_OWNER, AvailableBusinessRoles.BUSINESS_USER ],
    OFFER_COMMENT_DELETE_ITEM: [ AvailableBusinessRoles.BUSINESS_ADMIN, AvailableBusinessRoles.BUSINESS_OWNER, AvailableBusinessRoles.BUSINESS_USER ],
    OFFER_COMMENT_DELETE_SERVICE: [ AvailableBusinessRoles.BUSINESS_ADMIN, AvailableBusinessRoles.BUSINESS_OWNER, AvailableBusinessRoles.BUSINESS_USER ],

    OFFER_SUGGEST_DEAL_ITEM: [ AvailableBusinessRoles.BUSINESS_ADMIN, AvailableBusinessRoles.BUSINESS_OWNER, AvailableBusinessRoles.BUSINESS_USER ],
    OFFER_SUGGEST_DEAL_SERVICE: [ AvailableBusinessRoles.BUSINESS_ADMIN, AvailableBusinessRoles.BUSINESS_OWNER, AvailableBusinessRoles.BUSINESS_USER ],

    /** BUSINESS ACTIONS */
    BUSINESS_OVERVIEW_EDIT: [ AvailableBusinessRoles.BUSINESS_OWNER ],
    BUSINESS_PROFILE_EDIT: [ AvailableBusinessRoles.BUSINESS_ADMIN, AvailableBusinessRoles.BUSINESS_OWNER ],
    BUSINESS_PROFILE_UPDATE_BANNER: [ AvailableBusinessRoles.BUSINESS_ADMIN, AvailableBusinessRoles.BUSINESS_OWNER ],
    BUSINESS_PROFILE_UPDATE_LOGO: [ AvailableBusinessRoles.BUSINESS_ADMIN, AvailableBusinessRoles.BUSINESS_OWNER ],
    BUSINESS_PROFILE_UPDATE_BRAND_COLOR: [ AvailableBusinessRoles.BUSINESS_ADMIN, AvailableBusinessRoles.BUSINESS_OWNER ],
    BUSINESS_PROFILE_UPDATE_CONTACT_INFO: [ AvailableBusinessRoles.BUSINESS_ADMIN, AvailableBusinessRoles.BUSINESS_OWNER ],
    BUSINESS_PROFILE_VIEW_TEAM: [ AvailableBusinessRoles.BUSINESS_ADMIN, AvailableBusinessRoles.BUSINESS_OWNER ],
    BUSINESS_PROFILE_ADD_TEAM: [ AvailableBusinessRoles.BUSINESS_ADMIN, AvailableBusinessRoles.BUSINESS_OWNER ],
    BUSINESS_PROFILE_UPDATE_TEAM_MEMBER: [ AvailableBusinessRoles.BUSINESS_OWNER ],
    BUSINESS_PROFILE_UPDATE_TEAM_MEMBER_ROLE: [ AvailableBusinessRoles.BUSINESS_OWNER ],
    BUSINESS_PROFILE_DELETE_TEAM_MEMBER: [ AvailableBusinessRoles.BUSINESS_OWNER ],
    BUSINESS_PROFILE_MEMBER_RESEND_INVITATION: [ AvailableBusinessRoles.BUSINESS_ADMIN, AvailableBusinessRoles.BUSINESS_OWNER ],
    BUSINESS_PROFILE_MEMBER_DELETE_INVITATION: [ AvailableBusinessRoles.BUSINESS_ADMIN, AvailableBusinessRoles.BUSINESS_OWNER ],
    BUSINESS_PROFILE_ADD_ADDRESS: [ AvailableBusinessRoles.BUSINESS_ADMIN, AvailableBusinessRoles.BUSINESS_OWNER ],
    BUSINESS_PROFILE_UPDATE_ADDRESS: [ AvailableBusinessRoles.BUSINESS_ADMIN, AvailableBusinessRoles.BUSINESS_OWNER ],
    BUSINESS_PROFILE_DELETE_ADDRESS: [ AvailableBusinessRoles.BUSINESS_ADMIN, AvailableBusinessRoles.BUSINESS_OWNER ],
    BUSINESS_PROFILE_UPDATE_TIMINGS: [ AvailableBusinessRoles.BUSINESS_ADMIN, AvailableBusinessRoles.BUSINESS_OWNER ],
};
