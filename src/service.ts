import { uuidv4, NsGraph, NsGraphStatusCommand } from '@antv/xflow'
import type { NsNodeCmd, NsEdgeCmd, NsGraphCmd } from '@antv/xflow'
export namespace MockApi {
  /** 加载图数据的api */
  export const loadGraphData = async (meta: NsGraph.IGraphMeta) => {
    //var str = '{"nodes":[{"id":"node-c8963c7a-a53d-4c55-ad4e-574ffa23ac2d","renderKey":"Terminal","name":"Terminal","label":"","width":60,"height":40,"ports":{"items":[{"group":"top","id":"cdcc9226-3d13-4d28-817f-0bd069042cb6"},{"group":"right","id":"cda772e2-104b-45cf-9ba7-5a14a3c99bc3"},{"group":"bottom","id":"1256fbd9-b4ef-43d9-bea3-8c680af33044"},{"group":"left","id":"55d140c1-6ec2-4133-9dee-21a3ee683e6b"}],"groups":{"top":{"position":{"name":"top"},"attrs":{"circle":{"r":4,"magnet":true,"stroke":"#31d0c6","strokeWidth":2,"fill":"#fff","style":{"visibility":"hidden"}}},"zIndex":10},"right":{"position":{"name":"right"},"attrs":{"circle":{"r":4,"magnet":true,"stroke":"#31d0c6","strokeWidth":2,"fill":"#fff","style":{"visibility":"hidden"}}},"zIndex":10},"bottom":{"position":{"name":"bottom"},"attrs":{"circle":{"r":4,"magnet":true,"stroke":"#31d0c6","strokeWidth":2,"fill":"#fff","style":{"visibility":"hidden"}}},"zIndex":10},"left":{"position":{"name":"left"},"attrs":{"circle":{"r":4,"magnet":true,"stroke":"#31d0c6","strokeWidth":2,"fill":"#fff","style":{"visibility":"hidden"}}},"zIndex":10}}},"x":230,"y":110,"zIndex":10}],"edges":[]}'
    var str = await readFile();
    if(typeof str == 'string'){
      try{
        var obj = JSON.parse(str)
        if(typeof obj == 'object' && obj){
          return obj
        } else {
          return {}
        }
      } catch(e) {
        return {}
      }
    }
    return {}
  }

  /** 保存图数据的api */
  export const saveGraphData: NsGraphCmd.SaveGraphData.IArgs['saveGraphDataService'] = async (
    meta: NsGraph.IGraphMeta,
    graphData: NsGraph.IGraphData,
  ) => {
    //console.log('saveGraphData api', meta, graphData)
    exportRaw("xflow.json", JSON.stringify(graphData))
    return {
      success: true,
      data: graphData,
    }
  }

  const fakeClick = (obj) => {
    var ev = document.createEvent("MouseEvents");
    ev.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    obj.dispatchEvent(ev);
  }

  const exportRaw = (name, data) => {
    var urlObject = window.URL || window.webkitURL || window;
    var export_blob = new Blob([data]);
    var save_link = document.createElementNS("http://www.w3.org/1999/xhtml", "a")
    save_link.href = urlObject.createObjectURL(export_blob);
    save_link.download = name;
    fakeClick(save_link);
  }

  const readFile = () => {
    return new Promise((resolve, reject) => {
      var input = document.createElement("input")
      input.type = "file"
      input.click()

      input.addEventListener('change' , function(){
        let reader = new FileReader();
        reader.readAsText(input.files[0])
        reader.onload = (e) => {
          resolve(e.target.result);
        };
        reader.onerror = reject;
      })
    });
  }
}