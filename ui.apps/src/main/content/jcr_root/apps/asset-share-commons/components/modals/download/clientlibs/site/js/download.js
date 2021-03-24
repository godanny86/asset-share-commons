/*
 * Asset Share Commons
 *
 * Copyright [2017]  Adobe
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/*global jQuery: false, AssetShare: false*/

jQuery((function(ns, semanticModal, licenseModal, downloadService) {
    "use strict";
    AssetShare.SemanticUI.Modals.DownloadModal = (function () {
        var DOWNLOAD_URL = ns.Data.val("download-url"),
            DOWNLOAD_DIRECT = "asset-share-download-direct",
            DOWNLOAD_MODAL_ID = "download-modal",
            DOWNLOAD_BUTTON_ID = "download-asset",
            DOWNLOAD_MODE_ASYNC = "data-asset-share-mode-async";

        function getId() {
            return DOWNLOAD_MODAL_ID;
        }

        function getUrl() {
            return DOWNLOAD_URL;
        }

        function getModal(formDataOrAssetPath, licensed) {
            var formData = formDataOrAssetPath,
                downloadModal;

            if (typeof formDataOrAssetPath === 'string') {
                formData = new ns.FormData();
                formData.add("path", formDataOrAssetPath);
            }

            downloadModal = {
                id: DOWNLOAD_MODAL_ID,
                url: DOWNLOAD_URL,
                data: formData.serialize(),
                options: {
                    closePrevious: function(htmlResponse, modalTracker) {
                        var modal = $("<div>" + htmlResponse + "</div>").find(ns.Elements.selector(getId()));
                        if($(modal).data(DOWNLOAD_DIRECT)) {
                            for(var modalId of modalTracker) {
                                if(modalId != licenseModal.id()) {
                                    ns.Elements.element(modalId).modal('hide');
                                }
                            }
                        }
                    },
                    show: function(modal) {
                        // Direct download enabled
                        if($(modal).data(DOWNLOAD_DIRECT)) {
                            if(licensed) {
                                // manually submit the download AFTER license approved clicked
                                $("body").on("click", ns.Elements.selector([licenseModal.id(), licenseModal.acceptId()]), function (e) {
                                    $(modal).submit().remove();
                                });
                            } else {
                                $(modal).submit().remove();
                            }
                        } else { //normal download modal
                            if(licensed) {
                                // open download modal when license modal accepted
                                modal.modal("attach events", ns.Elements.selector([licenseModal.id(), licenseModal.acceptId()]));
                            } else {
                                // regular modal
                                modal.modal('show');
                            }
                        }
                    }
                }
            };

            return downloadModal;
        }

        function download(e) {
            var path = ns.Data.attr(this, "asset"),
                license = ns.Data.attr(this, "license"),
                downloadModal = getModal(path, license);

            e.preventDefault();
            e.stopPropagation();

            if (license && licenseModal.modal(path)) {
                semanticModal.show([licenseModal.modal(path), downloadModal]);
            } else {
                semanticModal.show([downloadModal]);
            }
        }

        /** REGISTER EVENTS WHEN DOCUMENT IS READY **/
        $((function registerEvents() {
            $("body").on("click", ns.Elements.selector([DOWNLOAD_BUTTON_ID]), download);

            // intercept async download submission
            $("body").on("submit", "[" + DOWNLOAD_MODE_ASYNC + "=\"true\"]", function (e) {
                var formEl = $(this);

                e.preventDefault();
                e.stopPropagation();

                if (formEl.form('is valid')) {
                    downloadService.initializeDownload(formEl);
                }
            });
        }()));

        return {
            id: getId,
            url: getUrl,
            modal: getModal,
            download: download
        };
    }());
}(AssetShare,
    AssetShare.SemanticUI.Modal,
    AssetShare.SemanticUI.Modals.LicenseModal,
    AssetShare.Download)));