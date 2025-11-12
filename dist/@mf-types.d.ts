
    export type RemoteKeys = 'REMOTE_ALIAS_IDENTIFIER/Jobs';
    type PackageType<T> = T extends 'REMOTE_ALIAS_IDENTIFIER/Jobs' ? typeof import('REMOTE_ALIAS_IDENTIFIER/Jobs') :any;