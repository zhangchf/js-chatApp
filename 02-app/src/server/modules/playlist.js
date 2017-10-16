import {ModuleBase} from "../lib/module";

export class PlaylistModule extends ModuleBase {
    constructor(io, usersModule, playlistRepository, videoServices) {
        super();

        this._io = io;
        this._user = usersModule;
        this._playlist = playlistRepository;
        this._services = videoServices;
    }
}