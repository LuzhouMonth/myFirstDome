<template>
    <div class="chat-header">
        <div class="media chat-name align-items-center text-truncate">
            <div class="avatar bg-success text-light d-none d-sm-inline-block mr-3">
                <span>
                  <svg class="hw-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </span>
            </div>
            <div class="media-body align-self-center ">
                <h6 class="text-truncate mb-0">群名（群聊名）</h6>
                <small class="text-muted">252条信息</small>
            </div>
        </div>

        <!-- Chat Options -->
        <ul class="nav flex-nowrap">
            <li class="nav-item list-inline-item d-none d-sm-block mr-1">
                <a class="nav-link text-muted px-1" data-toggle="collapse" data-target="#searchCollapse" href="#"
                   aria-expanded="false">
                    <svg class="hw-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>

                    <!-- <img src="./../assets/media/heroicons/outline/search.svg" alt="" class="injectable hw-20"> -->
                </a>
            </li>

            <li class="nav-item list-inline-item d-none d-sm-block mr-1">
                <a class="nav-link text-muted px-1" href="#" title="Add People">
                    <svg class="hw-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <!-- <img src="./../assets/media/heroicons/outline/phone.svg" alt="" class="injectable hw-20"> -->
                </a>
            </li>
            <li class="nav-item list-inline-item d-none d-sm-block mr-0">
                <div class="dropdown">
                    <a class="nav-link text-muted px-1" href="#" role="button" title="Details" data-toggle="dropdown"
                       aria-haspopup="true" aria-expanded="false">
                        <svg class="hw-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                  d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                        </svg>
                        <!-- <img src="./../assets/media/heroicons/outline/dots-vertical.svg" alt="" class="injectable hw-20"> -->
                    </a>

                    <div class="dropdown-menu dropdown-menu-right">
                        <a class="dropdown-item align-items-center d-flex" href="#" data-chat-info-toggle="">
                            <svg class="hw-20 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <!-- <img src="./../assets/media/heroicons/outline/information-circle.svg" alt="" class="injectable hw-20 mr-2"> -->
                            <span>View Info</span>
                        </a>
                    </div>
                </div>
            </li>
            <li class="nav-item list-inline-item d-sm-none mr-0">
                <div class="dropdown">
                    <a class="nav-link text-muted px-1" href="#" role="button" title="Details" data-toggle="dropdown"
                       aria-haspopup="true" aria-expanded="false">
                        <svg class="hw-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                  d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                        </svg>
                        <!-- <img src="./../assets/media/heroicons/outline/dots-vertical.svg" alt="" class="injectable hw-20"> -->
                    </a>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "HomeChatHeader"
    }
</script>

<style scoped>

</style>