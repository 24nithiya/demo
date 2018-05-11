/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 * 
 *   http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var session;

/*
 * ADD HERE CUSTOME HEADERS IF REQUIRED LIKE THAT:
 * 
 * $.ajaxSetup({headers : {
 * 	"Access-Control-Allow-Origin" : "http://www.yourcompany.com"
 * }});
 */

asyncTest("CMIS Connexion", function() {
	session = cmis.createSession($("input[name='serverUrl']").val());
	session.setCredentials($("input[name='username']").val(), $("input[name='password']").val()).loadRepositories({
		request : {
			success : function(data) {
				library.displayResult("CMIS Connexion", data);
				ok(true, "Successful connexion!");
				start();
				testSuite();
			},
			error : function(e) {
				if (e.responseJSON)
					ok(false, "Error during the request: " + e.responseJSON.message);
				else
					ok(false, "Error during the request: " + e.statusText);
				start();
			}
		}
	});
});

function testSuite() {

	var folderId;
	var fileId;
	var workingCopyId;
	var folderName = "CMIS_JS_LIB_" + (new Date()).getTime();

	asyncTest("Get Repository Info", function() {
		session.getRepositoryInfo({
			request : {
				success : function(data) {
					ok(true, "Get Repository Info: SUCCESS");
					library.displayResult("Get Repository Info", data);
					start();
				},
				error : function(e) {
					ok(false, "Error during the request: " + e.responseJSON.message);
					start();
				}
			}
		});
	});

	asyncTest("Create Folder", function() {
		session.createFolder(session.defaultRepository.rootFolderId, folderName, null, null, null, {
			request : {
				success : function(data) {
					folderId = data.properties["cmis:objectId"].value;
					ok(true, "Create Folder: SUCCESS");
					library.displayResult("Create Folder", data);
					start();
				},
				error : function(e) {
					ok(false, "Error during the request: " + e.responseJSON.message);
					start();
				}
			}
		});
	});

	asyncTest("Get Object By Path", function() {
		session.getObjectByPath("/" + folderName, {
			includeRelationships : 'both',
			request : {
				success : function(data) {
					ok(true, "Get Object By Path: SUCCESS");
					library.displayResult("Get Object By Path", data);
					start();
				},
				error : function(e) {
					ok(false, "Error during the request: " + e.responseJSON.message);
					start();
				}
			}
		});
	});

	asyncTest("Get Children", function() {
		session.getChildren(folderId, {
			request : {
				success : function(data) {
					ok(true, "Get Children: SUCCESS");
					library.displayResult("Get Children", data);
					start();
				},
				error : function(e) {
					ok(false, "Error during the request: " + e.responseJSON.message);
					start();
				}
			}
		});
	});

	asyncTest("Get Descendants", function() {
		session.getDescendants(folderId, 1, {
			request : {
				success : function(data) {
					ok(true, "Get Descendants: SUCCESS");
					library.displayResult("Get Descendants", data);
					start();
				},
				error : function(e) {
					ok(false, "Error during the request: " + e.responseJSON.message);
					start();
				}
			}
		});
	});

	asyncTest("Get Folder Parent", function() {
		session.getFolderParent(folderId, {
			request : {
				success : function(data) {
					ok(true, "Get Folder Parent: SUCCESS");
					library.displayResult("Get Folder Parent", data);
					start();
				},
				error : function(e) {
					ok(false, "Error during the request: " + e.responseJSON.message);
					start();
				}
			}
		});
	});
	/*
	 * asyncTest("Get Folder Tree", function() { session.getFolderTree(folderId,
	 * 1, { request : { success : function(data) { ok(true, "Get Folder Tree:
	 * SUCCESS"); library.displayResult("Get Folder Tree", data); start(); },
	 * error : function(e) { ok(false, "Error during the request: " +
	 * e.responseJSON.message); start(); } } }); });
	 */

	asyncTest("Get Parents", function() {
		session.getParents(folderId, {
			request : {
				success : function(data) {
					ok(true, "Get Parents: SUCCESS");
					library.displayResult("Get Parents", data);
					start();
				},
				error : function(e) {
					ok(false, "Error during the request: " + e.responseJSON.message);
					start();
				}
			}
		});
	});

	asyncTest("Get Allowable Actions", function() {
		session.getAllowableActions(folderId, {
			request : {
				success : function(data) {
					ok(true, "Get Allowable Actions: SUCCESS");
					library.displayResult("Get Allowable Actions", data);
					start();
				},
				error : function(e) {
					ok(false, "Error during the request: " + e.responseJSON.message);
					start();
				}
			}
		});
	});

	asyncTest("Get Properties", function() {
		session.getProperties(folderId, 'latest', {
			request : {
				success : function(data) {
					ok(true, "Get Properties: SUCCESS");
					library.displayResult("Get Properties", data);
					start();
				},
				error : function(e) {
					ok(false, "Error during the request: " + e.responseJSON.message);
					start();
				}
			}
		});
	});

	asyncTest("Get Type Children", function() {
		session.getTypeChildren(null, true, {
			request : {
				success : function(data) {
					ok(true, "Get Type Children: SUCCESS");
					library.displayResult("Get Type Children", data);
					start();
				},
				error : function(e) {
					ok(false, "Error during the request: " + e.responseJSON.message);
					start();
				}
			}
		});
	});

	asyncTest("Get Type Descendants", function() {
		session.getTypeDescendants("cmis:folder", null, true, {
			request : {
				success : function(data) {
					ok(true, "Get Type Descendants: SUCCESS");
					library.displayResult("Get Type Descendants", data);
					start();
				},
				error : function(e) {
					ok(false, "Error during the request: " + e.responseJSON.message);
					start();
				}
			}
		});
	});

	asyncTest("Get Type Definition", function() {
		session.getTypeDefinition("cmis:folder", {
			request : {
				success : function(data) {
					ok(true, "Get Type Definition: SUCCESS");
					library.displayResult("Get Type Definition", data);
					start();
				},
				error : function(e) {
					ok(false, "Error during the request: " + e.responseJSON.message);
					start();
				}
			}
		});
	});

	asyncTest("Create Document", function() {
		var file = $("input[name='file']")[0].files[0];
		
		session.createDocument(folderId, file, "test-file.txt", "text/plain", "major", null, null, null, {
			request : {
				success : function(data) {
					fileId = data.properties["cmis:objectId"].value;
					ok(true, "Create Document: SUCCESS");
					library.displayResult("Create Document", data);
					start();
				},
				error : function(e) {
					ok(false, "Error during the request: " + e.responseJSON.message);
					start();
				}
			}
		});
	});
	
	test("Get Content Stream URL", function() {
		var url = session.getContentStreamURL(fileId, true);
		ok(url.length > 0, "Get Content Stream URL: " + url);
	});

	asyncTest("Set Content Stream", function() {
		var file = $("input[name='file']")[0].files[0];
		
		session.setContentStream(fileId, file, true, "text/plain", {
			request : {
				success : function(data) {
					fileId = data.properties["cmis:objectId"].value;
					ok(true, "Set Content Stream: SUCCESS");
					library.displayResult("Set Content Stream", data);
					start();
				},
				error : function(e) {
					ok(false, "Error during the request: " + e.responseJSON.message);
					start();
				}
			}
		});
	});


	asyncTest("Create Document From Source", function() {
		session.createDocumentFromSource(folderId, fileId, "TEST FILE DATA", "test-file-2.txt", "text/plain", "major", null, null, null, {
			request : {
				success : function(data) {
					ok(true, "Create Document From Source: SUCCESS");
					library.displayResult("Create Document From Source", data);
					start();
				},
				error : function(e) {
					ok(false, "Error during the request: " + e.responseJSON.message);
					start();
				}
			}
		});
	});

	asyncTest("Update Properties", function() {
		session.updateProperties(fileId, {
			'cmis:name' : 'myfile.txt'
		}, {
			request : {
				success : function(data) {
					fileId = data.properties["cmis:objectId"].value;
					ok(true, "Update Properties: SUCCESS");
					library.displayResult("Update Properties", data);
					start();
				},
				error : function(e) {
					ok(false, "Error during the request: " + e.responseJSON.message);
					start();
				}
			}
		});
	});

	/*
	asyncTest("Bulk Update Properties", function() {

		session.query('select * from cmis:document where IN_FOLDER(\'' + folderId + '\') ', false, {
			request : {
				success : function(data) {

					var ids = new Array();
					$(data.results).each(function(index) {
						var id = this.properties['cmis:objectId'];
						ids.push(id);
					});

					session.bulkUpdateProperties(ids, {
						'cmis:name' : 'myfile.txt'
					}, null, null, {
						request : {
							success : function(data) {
								ok(true, "Bulk Update Properties: SUCCESS");
								library.displayResult("Bulk Update Properties", data);
								start();
							},
							error : function(e) {
								ok(false, "Error during the request: " + e.responseJSON.message);
								start();
							}
						}
					});
				},
				error : function(e) {
					ok(false, "Error during the request: " + e.responseJSON.message);
					start();
				}
			}
		});
	});*/

	asyncTest("Get Object", function() {
		session.getObject(fileId, 'latest', {
			request : {
				success : function(data) {
					ok(true, "Get Object: SUCCESS");
					library.displayResult("Get Object", data);
					start();
				},
				error : function(e) {
					ok(false, "Error during the request: " + e.responseJSON.message);
					start();
				}
			}
		});
	});

	asyncTest("Get Renditions", function() {
		session.getRenditions(fileId, {
			request : {
				success : function(data) {
					ok(true, "Get Renditions: SUCCESS");
					library.displayResult("Get Renditions", data);
					start();
				},
				error : function(e) {
					ok(false, "Error during the request: " + e.responseJSON.message);
					start();
				}
			}
		});
	});

	asyncTest("Get Content Stream", function() {
		session.getContentStream(fileId, false, {
			request : {
				complete : function(e, textStatus, errorThrown) {
					if (e.status == 200)
						ok(true, "Get Content Stream: " + e.responseText);
					else
						ok(false, "Error during the request: " + e.responseJSON.message);
					start();
				}
			}
		});
	});

	/*
	asyncTest("Append Content Stream", function() {
		var file = $("input[name='file']")[0].files[0];
		
		session.appendContentStream(fileId, file, true, {
			request : {
				success : function(data) {
					ok(true, "Append Content Stream: SUCCESS");
					library.displayResult("Append Content Stream", data);
					start();
				},
				error : function(e) {
					ok(false, "Error during the request: " + e.responseJSON.message);
					start();
				}
			}
		});
	});
	*/

	asyncTest("Check-out", function() {
		session.checkOut(fileId, {
			request : {
				success : function(data) {
					workingCopyId = data.properties['cmis:objectId'].value;
					ok(true, "Check-out: SUCCESS");
					library.displayResult("Check-out", data);
					start();
				},
				error : function(e) {
					ok(false, "Error during the request: " + e.responseJSON.message);
					start();
				}
			}
		});
	});

	asyncTest("Get Checked Out Documents", function() {
		session.getCheckedOutDocs(null, {
			request : {
				success : function(data) {
					ok(true, "Get Checked Out Documents: SUCCESS");
					library.displayResult("Get Checked Out Documents", data);
					start();
				},
				error : function(e) {
					ok(false, "Error during the request: " + e.responseJSON.message);
					start();
				}
			}
		});
	});

	asyncTest("Cancel Check-out", function() {
		session.cancelCheckOut(workingCopyId, {
			request : {
				complete : function(e, textStatus, errorThrown) {
					if (e.status == 200)
						ok(true, "Cancel check-out document: SUCCESS");
					else
						ok(false, "Error during the request: " + e.responseJSON.message);
					start();
				}
			}
		});
	});

	asyncTest("Check-out", function() {
		session.checkOut(fileId, {
			request : {
				success : function(data) {
					workingCopyId = data.properties['cmis:objectId'].value;
					ok(true, "Check-out: SUCCESS");
					library.displayResult("Check-out", data);
					start();
				},
				error : function(e) {
					ok(false, "Error during the request: " + e.responseJSON.message);
					start();
				}
			}
		});
	});

	asyncTest("Check-in", function() {
		session.checkIn(workingCopyId, true, 'new_name.txt', 'UPDATE', 'Check-in', null, null, null, {
			request : {
				success : function(data) {
					fileId = data.properties['cmis:objectId'].value;
					ok(true, "Check-in: SUCCESS");
					library.displayResult("Check-in", data);
					start();
				},
				error : function(e) {
					ok(false, "Error during the request: " + e.responseJSON.message);
					start();
				}
			}
		});
	});

	asyncTest("Move Object", function() {
		session.createFolder(session.defaultRepository.rootFolderId, folderName + "_B", null, null, null, {
			request : {
				success : function(data) {
					var targetFolderId = data.properties["cmis:objectId"].value;

					session.moveObject(fileId, folderId, targetFolderId, {
						request : {
							success : function(data) {
								ok(true, "Move Object: SUCCESS");
								library.displayResult("Move Object", data);
								start();
							},
							error : function(e) {
								ok(false, "Error during the request: " + e.responseJSON.message);
								start();
							}
						}
					});
				},
				error : function(e) {
					ok(false, "Error during the request: " + e.responseJSON.message);
					start();
				}
			}
		});
	});

	asyncTest("Add Object To Folder", function() {
		session.addObjectToFolder(fileId, folderId, true, {
			request : {
				success : function(data) {
					ok(true, "Add Object To Folder: SUCCESS");
					library.displayResult("Add Object To Folder", data);
					start();
				},
				error : function(e) {
					ok(false, "Error during the request: " + e.responseJSON.message);
					start();
				}
			}
		});
	});

	asyncTest("Remove Object To Folder", function() {
		session.removeObjectFromFolder(fileId, folderId, {
			request : {
				success : function(data) {
					ok(true, "Remove Object To Folder: SUCCESS");
					library.displayResult("Remove Object To Folder", data);
					start();
				},
				error : function(e) {
					ok(false, "Error during the request: " + e.responseJSON.message);
					start();
				}
			}
		});
	});

	asyncTest("Get all versions", function() {
		session.getAllVersions(fileId, {
			request : {
				success : function(data) {
					ok(true, "Get all versions: SUCCESS");
					library.displayResult("Get all versions", data);
					start();
				},
				error : function(e) {
					ok(false, "Error during the request: " + e.responseJSON.message);
					start();
				}
			}
		});
	});

	asyncTest("Get relationships", function() {
		session.getObjectRelationships(fileId, true, 'either', null, {
			request : {
				success : function(data) {
					ok(true, "Get relationships: SUCCESS");
					library.displayResult("Get relationships", data);
					start();
				},
				error : function(e) {
					ok(false, "Error during the request: " + e.responseJSON.message);
					start();
				}
			}
		});
	});

	/*
	 * test("createRelationship", function() { ok(false, "Test not
	 * implemented."); });
	 * 
	 */

	asyncTest("Get applied policies", function() {
		session.getAppliedPolicies(fileId, {
			request : {
				success : function(data) {
					ok(true, "Get applied policies: SUCCESS");
					library.displayResult("Get applied policies", data);
					start();
				},
				error : function(e) {
					ok(false, "Error during the request: " + e.responseJSON.message);
					start();
				}
			}
		});
	});

	/*
	 * test("createPolicy", function() { ok(false, "Test not implemented."); });
	 * test("applyPolicy", function() { ok(false, "Test not implemented."); });
	 * test("removePolicy", function() { ok(false, "Test not implemented."); });
	 * 
	 */

	asyncTest("Get ACL", function() {
		session.getACL(fileId, false, {
			request : {
				success : function(data) {
					ok(true, "Get ACL: SUCCESS");
					library.displayResult("Get ACL", data);
					start();
				},
				error : function(e) {
					ok(false, "Error during the request: " + e.responseJSON.message);
					start();
				}
			}
		});
	});

	asyncTest("Apply ACL", function() {
		session.applyACL(fileId, {
			'GROUP_EVERYONE' : [ 'cmis:write' ]
		}, null, true, {
			request : {
				success : function(data) {
					ok(true, "Apply ACL: SUCCESS");
					library.displayResult("Apply ACL", data);
					start();
				},
				error : function(e) {
					ok(false, "Error during the request: " + e.responseJSON.message);
					start();
				}
			}
		});
	});

	asyncTest("Delete Object", function() {
		session.deleteObject(fileId, true, {
			request : {
				complete : function(e, textStatus, errorThrown) {
					if (e.status == 200)
						ok(true, "Delete Object: SUCCESS");
					else
						ok(false, "Error during the request: " + e.responseJSON.message);
					start();
				}
			}
		});
	});

	asyncTest("Delete Tree", function() {
		session.deleteTree(folderId, true, 'delete', true, {
			request : {
				complete : function(e, textStatus, errorThrown) {
					if (e.status == 200)
						ok(true, "Delete Tree: SUCCESS");
					else
						ok(false, "Error during the request: " + e.responseJSON.message);
					start();
				}
			}
		});
	});

	asyncTest("Query", function() {
		session.query('select * from cmis:folder ', false, {
			maxItems : 5,
			request : {
				success : function(data) {
					ok(true, "Query: SUCCESS");
					library.displayResult("Query", data);
					start();
				},
				error : function(e) {
					ok(false, "Error during the request: " + e.responseJSON.message);
					start();
				}
			}
		});
	});

	/*
	asyncTest("Get Last Result", function() {
		session.getLastResult({
			request : {
				success : function(data) {
					ok(true, "Get Last Result: SUCCESS");
					library.displayResult("Get Last Result", data);
					start();
				},
				error : function(e) {
					ok(false, "Error during the request: " + e.responseJSON.message);
					start();
				}
			}
		});
	});*/

	asyncTest("Get Content Changes", function() {
		session.getContentChanges(null, true, false, false, {
			maxItems : 5,
			request : {
				success : function(data) {
					ok(true, "Get Content Changes: SUCCESS");
					library.displayResult("Get Content Changes", data);
					start();
				},
				error : function(e) {
					ok(false, "Error during the request: " + e.responseJSON.message);
					start();
				}
			}
		});
	});
	
}

QUnit.config.reorder = false;
QUnit.config.autostart = false;
QUnit.done(function(details) {
	library.refreshPanels();
});

$("#start").click(function() {
	$("#start").prop('disabled', true);
	QUnit.start();
});
